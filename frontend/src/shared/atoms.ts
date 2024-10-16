import { atom } from "jotai";
import { UserProfile } from "./factories/user-profile-factory";
import {
  FolderGroupBy,
  FolderSettings,
  FolderSortDirection,
} from "@/components/user-folder-render/user-folder-render";

export const sidebarAtom = atom<boolean>(
  sessionStorage.getItem("todo-sync:is-sidebar-open")
    ? sessionStorage.getItem("todo-sync:is-sidebar-open") === "true"
    : true
);

export const profileAtom = atom<UserProfile | null>(null);

export const folderSettingsAtom = atom<FolderSettings>({
  groupBy: (localStorage.getItem("todo-sync:group-by") ??
    "date") as FolderGroupBy,
  sortDirection: (localStorage.getItem("todo-sync:sort-direction") ??
    "desc") as FolderSortDirection,
});
