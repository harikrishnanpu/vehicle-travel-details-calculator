import bcrypt from "bcryptjs";
import { AppError } from "../utils/app.error.js";
import { signToken } from "../utils/jwt.js";
import { toPublicUser } from "../utils/user.js";
import { userRepository } from "../repositories/user.repo.js";
import type { LoginInput } from "../validators/login.schema.js";
import type { SignupInput } from "../validators/signup.schema.js";

export const authService = {
  async signup(input: SignupInput) {
    const existing = await userRepository.findByEmail(input.email);

    if (existing) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    return {
      user: toPublicUser(user),
      token: signToken(user.id),
    };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(input.password, user.password);

    if (!valid) {
      throw new AppError("Invalid email or password", 401);
    }

    return {
      user: toPublicUser(user),
      token: signToken(user.id),
    };
  },

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toPublicUser(user);
  },
};
