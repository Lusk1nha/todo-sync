import { z } from "zod";

export const FolderColumnSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório!",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres!")
    .max(50, "Nome deve ter no máximo 50 caracteres!"),
  position: z.number().int().min(0, "Posição deve ser maior ou igual a 0!"),
});

export type FolderColumnSchemaType = z.infer<typeof FolderColumnSchema>;

export const FolderSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório!",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres!")
    .max(255, "Nome deve ter no máximo 255 caracteres!"),

  description: z.string().nullable(),

  columns: z.array(FolderColumnSchema).default([]),

  color: z
    .string({
      required_error: "Cor é obrigatória!",
    })
    .min(7, "Cor deve ter no mínimo 7 caracteres!")
    .max(7, "Cor deve ter no máximo 7 caracteres!"),
});

export type FolderSchemaType = z.infer<typeof FolderSchema>;
