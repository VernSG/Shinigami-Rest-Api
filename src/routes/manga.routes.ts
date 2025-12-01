import { Router } from "express";
import { MangaController } from "../controllers/manga.controller";

const router = Router();
const mangaController = new MangaController();

/**
 * @route   GET /api/manga/popular
 * @desc    Get popular manga
 * @query   page - Page number (default: 1)
 * @access  Public
 */
router.get("/popular", mangaController.getPopularManga);

/**
 * @route   GET /api/manga/latest
 * @desc    Get latest manga updates
 * @query   page - Page number (default: 1)
 * @access  Public
 */
router.get("/latest", mangaController.getLatestUpdates);

/**
 * @route   GET /api/manga/search
 * @desc    Search manga
 * @query   q - Search query (required)
 * @query   page - Page number (default: 1)
 * @access  Public
 */
router.get("/search", mangaController.searchManga);

/**
 * @route   GET /api/manga/:mangaId
 * @desc    Get manga details
 * @param   mangaId - Manga ID
 * @access  Public
 */
router.get("/:mangaId", mangaController.getMangaDetails);

/**
 * @route   GET /api/manga/:mangaId/chapters
 * @desc    Get chapter list for a manga
 * @param   mangaId - Manga ID
 * @access  Public
 */
router.get("/:mangaId/chapters", mangaController.getChapterList);

/**
 * @route   GET /api/manga/chapter/:chapterId/pages
 * @desc    Get page list for a chapter
 * @param   chapterId - Chapter ID
 * @access  Public
 */
router.get("/chapter/:chapterId/pages", mangaController.getPageList);

/**
 * @route   GET /api/manga/image
 * @desc    Download manga image with proper headers
 * @query   url - Image URL (required)
 * @access  Public
 */
router.get("/image", mangaController.downloadImage);

export default router;
