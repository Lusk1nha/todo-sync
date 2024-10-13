import { FolderSortDirection } from "@/components/user-folder-render/user-folder-render";
import { Folder } from "../factories/folders-factory";

import { format, isSameDay, isSameWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RoutesEnum } from "../enums/routes-enum";

export function generateFolderRedirect(folderId: string): string {
  const pathWithId = RoutesEnum.FOLDER.replace(":folderId", folderId);
  return pathWithId;
}

export function formatFolderDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return "Hoje";
  }

  if (date.getDate() === yesterday.getDate()) {
    return "Ontem";
  }

  if (isSameWeek(date, today)) {
    return format(date, "EEEE", { locale: ptBR });
  }

  return format(date, "dd/MM/yyyy");
}

export function groupFoldersByDate(
  folders: Folder[]
): Record<string, Folder[]> {
  return folders.reduce((acc, folder) => {
    const key = formatFolderDate(folder.updated_at);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(folder);

    return acc;
  }, {} as Record<string, Folder[]>);
}

export function groupFoldersByFirstLetter(
  folders: Folder[]
): Record<string, Folder[]> {
  return folders.reduce((acc, folder) => {
    const key = folder.name[0].toUpperCase();

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(folder);

    return acc;
  }, {} as Record<string, Folder[]>);
}

export function getSortedFoldersByDate(
  folders: Folder[],
  sortBy: "created_at" | "updated_at" = "updated_at",
  direction: FolderSortDirection = "desc"
): Folder[] {
  if (direction === "asc") {
    return folders.sort((a, b) => {
      return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
    });
  }

  return folders.sort((a, b) => {
    return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
  });
}

export function getSortedFoldersByName(
  folders: Folder[],
  direction: FolderSortDirection = "asc"
): Folder[] {
  if (direction === "asc") {
    return folders.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  return folders.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });
}
