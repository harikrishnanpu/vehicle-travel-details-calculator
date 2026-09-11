import type { Response } from "express";

export function sendSuccess(
  res: Response,
  data: unknown,
  status = 200,
  message = "success",
) {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
}

export function sendError(res: Response, status: number, message = "error") {
  return res.status(status).json({
    success: false,
    message,
  });
}
