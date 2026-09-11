import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthPayload } from "../types/auth.js";
import { AppError } from "../utils/app.error.js";
import { AUTH_COOKIE } from "../utils/cookie.js";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.[AUTH_COOKIE];

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;

    if (!payload.sub) {
      throw new AppError("Unauthorized", 401);
    }

    req.userId = payload.sub;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      next(err);
      return;
    }

    next(new AppError("Invalid or expired token", 401));
  }
}
