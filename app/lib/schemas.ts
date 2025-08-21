import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title cannot exceed 100 characters" }),
  content: z.string().min(1, { message: "Content cannot be blank" }).max(1000, { message: "Content text should not exceed 1000 characters" }),
});

export const CommentSchema = z.object({
  postId: z.preprocess((val) => Number(val), z.number().min(1, { message: "Invalid Post ID." })),
  content: z.string().min(1, { message: "Content cannot be blank" }).max(1000, { message: "Content text should not exceed 1000 characters" }),
});
