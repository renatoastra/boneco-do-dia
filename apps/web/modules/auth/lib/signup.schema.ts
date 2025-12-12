import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;