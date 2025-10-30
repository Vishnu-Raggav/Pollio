import * as z from "zod";

export const formSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(8, "Password must contain atleast 8 characters"),
});

export type SchemaType = z.infer<typeof formSchema>;
