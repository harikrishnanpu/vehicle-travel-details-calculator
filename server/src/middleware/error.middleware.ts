import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { AppError } from "../utils/app.error.js";
import { sendError } from "../utils/response.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return sendError(res, 400, "File too large (max 10MB)");
    }

    return sendError(res, 400, err.message);
  }

  console.error(err);
  return sendError(res, 500, "Internal server error");
}
