import type { CookieOptions, Response } from "express";
import { env } from "../config/env.js";

export const AUTH_COOKIE = "token";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export function setAuthCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE, token, cookieOptions);
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
