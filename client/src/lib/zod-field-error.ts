import type { ZodError } from "zod";

export function getFieldError(error: ZodError, field: string) {
  const issues = error.issues;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].path[0] === field) {
      return issues[i].message;
    }
  }

  return "";
}
