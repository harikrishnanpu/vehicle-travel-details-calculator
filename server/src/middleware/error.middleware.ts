import type { NextFunction, Request, Response } from "express";
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

  console.error(err);
  return sendError(res, 500, "Internal server error");
}
