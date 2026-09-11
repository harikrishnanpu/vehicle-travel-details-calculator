import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/app.error.js";

type AuthPayload = {
  sub: string;
};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = header.slice("Bearer ".length).trim();

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
