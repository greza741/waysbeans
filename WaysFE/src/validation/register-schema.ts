import { z } from "zod";

// const regexPassword =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be at most 20 characters long"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters long")
      .max(20, "Password must be at most 20 characters long"),
    // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  })
  .required();

export type RegisterSchema = z.infer<typeof registerSchema>;
