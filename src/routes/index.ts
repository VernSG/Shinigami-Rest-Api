import { Router, Request, Response } from "express";
import mangaRoutes from "./manga.routes";

const router = Router();

// Mount routes
router.use("/manga", mangaRoutes);

// Health check route
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Shinigami API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
