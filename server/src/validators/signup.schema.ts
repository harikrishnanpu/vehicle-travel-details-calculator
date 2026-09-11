import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
});

export type SignupInput = z.infer<typeof signupSchema>;
