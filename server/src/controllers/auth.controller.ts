import type { Request, Response } from "express";
import { AppError } from "../utils/app.error.js";
import { clearAuthCookie, setAuthCookie } from "../utils/cookie.js";
import { sendSuccess } from "../utils/response.js";
import { validateSchema } from "../utils/validate.js";
import { authService } from "../services/auth.service.js";
import { loginSchema } from "../validators/login.schema.js";
import { signupSchema } from "../validators/signup.schema.js";

export const authController = {
  async signup(req: Request, res: Response) {
    const input = validateSchema(signupSchema, req.body);
    const result = await authService.signup(input);

    setAuthCookie(res, result.token);
    sendSuccess(res, result.user, 201, "Signup successful");
  },

  async login(req: Request, res: Response) {
    const input = validateSchema(loginSchema, req.body);
    const result = await authService.login(input);

    setAuthCookie(res, result.token);
    sendSuccess(res, result.user, 200, "Login successful");
  },

  async me(req: Request, res: Response) {
    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await authService.getMe(req.userId);
    sendSuccess(res, user, 200, "User fetched successfully");
  },

  async logout(_req: Request, res: Response) {
    clearAuthCookie(res);
    sendSuccess(res, null, 200, "Logout successful");
  },
};
