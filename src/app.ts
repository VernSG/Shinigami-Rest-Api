import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use("/api", routes);

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Shinigami REST API",
    version: "1.0.0",
    documentation: "https://github.com/VernSG/shinigami-rest-api",
    endpoints: {
      health: "/api/health",
      popular: "/api/manga/popular?page=1",
      latest: "/api/manga/latest?page=1",
      search: "/api/manga/search?q=query&page=1",
      details: "/api/manga/:mangaId",
      chapters: "/api/manga/:mangaId/chapters",
      pages: "/api/manga/chapter/:chapterId/pages",
      image: "/api/manga/image?url=imageUrl",
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
