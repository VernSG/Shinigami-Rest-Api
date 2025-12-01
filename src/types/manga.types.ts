export interface Manga {
  title: string;
  thumbnail: string;
  url: string;
  mangaUrl: string;
}

export interface MangaListResponse {
  mangas: Manga[];
  hasNextPage: boolean;
}

export interface MangaDetails {
  title: string;
  author: string;
  artist: string;
  status: string;
  description: string;
  genre: string;
  thumbnail: string;
}

export interface Chapter {
  name: string;
  dateUpload: number;
  url: string;
  chapterUrl: string;
}

export interface Page {
  index: number;
  imageUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
}
