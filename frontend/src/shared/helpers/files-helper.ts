import { z } from "zod";

export const FileSchemaValidation = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().optional(),
});

export type FileSchemaType = z.infer<typeof FileSchemaValidation>;

export function getFilesToFileSchema(files: File[]): FileSchemaType[] {
  return files?.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));
}
