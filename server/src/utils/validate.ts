import type { ZodType } from "zod";
import { AppError } from "./app.error.js";

export function validateSchema<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(", ");
    throw new AppError(message || "Validation failed", 400);
  }

  return result.data;
}
