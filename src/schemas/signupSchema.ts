import * as z from "zod";

export const formSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Password must contain atleast 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SchemaType = z.infer<typeof formSchema>;
