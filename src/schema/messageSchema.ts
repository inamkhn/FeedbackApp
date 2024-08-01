import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(30, { message: "content must be at least 30 characters" })
    .max(300, { message: "content should not more than 300 characters" }),
});
