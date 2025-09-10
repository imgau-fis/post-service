import { z } from "zod";

export const attributeSchema = z.object({
  key: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9._-]+$/),
  type: z.enum(["STRING", "INT", "FLOAT", "BOOL", "DATE", "DECIMAL"]),
  value: z.any(),
});

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  bodyHtml: z.string().min(1),
  tags: z.array(z.string()).max(30).optional(),
  attributes: z.array(attributeSchema).max(200).optional(),
});
export type CreatePostDto = z.infer<typeof createPostSchema>;
