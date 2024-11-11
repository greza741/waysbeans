import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters long")
      .max(20, "Password must be at most 20 characters long"),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
