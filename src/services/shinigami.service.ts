import axios, { AxiosInstance } from "axios";
import {
  Manga,
  MangaListResponse,
  MangaDetails,
  Chapter,
  Page,
} from "../types/manga.types";

export class ShinigamiService {
  private baseUrl: string;
  private apiUrl: string;
  private cdnUrl: string;
  private client: AxiosInstance;

  constructor() {
    this.baseUrl = "https://app.shinigami.asia";
    this.apiUrl = "https://api.shngm.io";
    this.cdnUrl = "https://storage.shngm.id";

    this.client = axios.create({
      timeout: 30000,
      headers: this.getApiHeaders(),
    });
  }

  private randomString(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private getApiHeaders(): Record<string, string> {
    return {
      Accept: "application/json",
      DNT: "1",
      Origin: this.baseUrl,
      "Sec-GPC": "1",
      "X-Requested-With": this.randomString(Math.floor(Math.random() * 20) + 1),
    };
  }

  private getImageHeaders(): Record<string, string> {
    return {
      Accept:
        "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      DNT: "1",
      Referer: `${this.baseUrl}/`,
      "Sec-Fetch-Dest": "empty",
      "Sec-GPC": "1",
      "X-Requested-With": this.randomString(Math.floor(Math.random() * 20) + 1),
    };
  }

  private toStatus(statusCode: number): string {
    if (statusCode === 1) return "Ongoing";
    if (statusCode === 2) return "Completed";
    return "Unknown";
  }

  async getPopularManga(page: number = 1): Promise<MangaListResponse> {
    try {
      const response = await this.client.get(`${this.apiUrl}/v1/manga/list`, {
        params: {
          page,
          page_size: 30,
          sort: "popularity",
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response from API");
      }

      const mangas: Manga[] = response.data.data.map((item: any) => ({
        title: item.title || "Unknown",
        thumbnail: item.cover_image_url || item.cover_portrait_url || "",
        url: item.manga_id || "",
        mangaUrl: `${this.baseUrl}/series/${item.manga_id}`,
      }));

      return {
        mangas,
        hasNextPage:
          response.data.meta?.page < response.data.meta?.total_page || false,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to get popular manga: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to get popular manga: ${error.message}`);
    }
  }

  async getLatestUpdates(page: number = 1): Promise<MangaListResponse> {
    try {
      const response = await this.client.get(`${this.apiUrl}/v1/manga/list`, {
        params: {
          page,
          page_size: 30,
          sort: "latest",
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response from API");
      }

      const mangas: Manga[] = response.data.data.map((item: any) => ({
        title: item.title || "Unknown",
        thumbnail: item.cover_image_url || item.cover_portrait_url || "",
        url: item.manga_id || "",
        mangaUrl: `${this.baseUrl}/series/${item.manga_id}`,
      }));

      return {
        mangas,
        hasNextPage:
          response.data.meta?.page < response.data.meta?.total_page || false,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to get latest updates: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to get latest updates: ${error.message}`);
    }
  }

  async searchManga(
    query: string,
    page: number = 1
  ): Promise<MangaListResponse> {
    try {
      const params: any = {
        page,
        page_size: 30,
      };

      if (query && query.length > 0) {
        params.q = query;
      }

      const response = await this.client.get(`${this.apiUrl}/v1/manga/list`, {
        params,
      });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response from API");
      }

      const mangas: Manga[] = response.data.data.map((item: any) => ({
        title: item.title || "Unknown",
        thumbnail: item.cover_image_url || item.cover_portrait_url || "",
        url: item.manga_id || "",
        mangaUrl: `${this.baseUrl}/series/${item.manga_id}`,
      }));

      return {
        mangas,
        hasNextPage:
          response.data.meta?.page < response.data.meta?.total_page || false,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to search manga: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to search manga: ${error.message}`);
    }
  }

  async getMangaDetails(mangaId: string): Promise<MangaDetails> {
    try {
      const response = await this.client.get(
        `${this.apiUrl}/v1/manga/detail/${mangaId}`
      );

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response from API");
      }

      const data = response.data.data;
      const taxonomy = data.taxonomy || {};

      const getNames = (items: any[]): string =>
        items ? items.map((item) => item.name).join(", ") : "";

      const authors = getNames(taxonomy.Author);
      const artists = getNames(taxonomy.Artist);
      const genres = getNames(taxonomy.Genre);
      const format = getNames(taxonomy.Format);

      const tags = [genres, format].filter((t) => t.length > 0).join(", ");

      return {
        title: data.title || "Unknown",
        author: authors || "Unknown",
        artist: artists || "Unknown",
        status: this.toStatus(data.status),
        description: data.description || "",
        genre: tags || "",
        thumbnail: data.cover_image_url || data.cover_portrait_url || "",
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to get manga details: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to get manga details: ${error.message}`);
    }
  }

  async getChapterList(mangaId: string): Promise<Chapter[]> {
    try {
      const response = await this.client.get(
        `${this.apiUrl}/v1/chapter/${mangaId}/list`,
        {
          params: {
            page_size: 3000,
          },
        }
      );

      let chapterList: any[] = [];

      if (Array.isArray(response.data)) {
        chapterList = response.data;
      } else if (
        response.data?.chapter_list &&
        Array.isArray(response.data.chapter_list)
      ) {
        chapterList = response.data.chapter_list;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        chapterList = response.data.data;
      }

      if (!chapterList || chapterList.length === 0) {
        return [];
      }

      const chapters: Chapter[] = chapterList.map((item: any) => {
        let dateUpload = 0;

        const dateStr = item.release_date || item.date || item.created_at;
        if (dateStr) {
          try {
            dateUpload = new Date(dateStr).getTime();
          } catch (e) {
            // Ignore parse errors
          }
        }

        const chapterNum = String(
          item.chapter_number || item.name || item.number || ""
        ).replace(".0", "");

        const chapterTitle = item.chapter_title || item.title || "";
        const name = chapterTitle
          ? `Chapter ${chapterNum} - ${chapterTitle}`
          : `Chapter ${chapterNum}`;

        return {
          name: name.trim(),
          dateUpload,
          url: item.chapter_id || item.id || "",
          chapterUrl: `${this.baseUrl}/series/${mangaId}/${
            item.chapter_id || item.id
          }`,
        };
      });

      return chapters;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to get chapter list: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to get chapter list: ${error.message}`);
    }
  }

  async getPageList(chapterId: string): Promise<Page[]> {
    try {
      const response = await this.client.get(
        `${this.apiUrl}/v1/chapter/detail/${chapterId}`
      );

      let pages: string[] = [];
      let baseUrl = "";
      let path = "";

      if (response.data?.data?.chapter) {
        const chapterData = response.data.data;
        baseUrl = chapterData.base_url || chapterData.base_url_low || "";
        path = chapterData.chapter.path || "";
        pages = chapterData.chapter.data || [];
      } else if (response.data?.page_list?.chapter_page) {
        const pageList = response.data.page_list.chapter_page;
        baseUrl = this.cdnUrl;
        path = pageList.path || "";
        pages = pageList.pages || [];
      } else if (response.data?.pages) {
        pages = response.data.pages;
        baseUrl = response.data.base_url || this.cdnUrl;
        path = response.data.path || "";
      } else if (Array.isArray(response.data)) {
        return response.data.map((page: any, index: number) => ({
          index,
          imageUrl: page.image_url || page.url || page,
        }));
      }

      if (!pages || !Array.isArray(pages) || pages.length === 0) {
        throw new Error("Invalid response from API - pages not found or empty");
      }

      return pages.map((page: string, index: number) => ({
        index,
        imageUrl: `${baseUrl}${path}${page}`,
      }));
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to get page list: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`
        );
      }
      throw new Error(`Failed to get page list: ${error.message}`);
    }
  }

  async downloadImage(imageUrl: string): Promise<Buffer> {
    const response = await axios.get(imageUrl, {
      headers: this.getImageHeaders(),
      responseType: "arraybuffer",
    });

    return response.data;
  }
}
