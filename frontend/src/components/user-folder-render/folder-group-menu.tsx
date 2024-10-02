import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { FolderGroupBy, FolderSortDirection } from "./user-folder-render";
import {
  CalendarDays,
  CaseUpper,
  CircleX,
  Settings2,
  SortAsc,
  SortDesc,
} from "lucide-react";

type FolderGroupStrings = {
  text?: string;

  groupBy?: {
    title?: string;
    none?: string;
    firstLetter?: string;
    date?: string;
  };

  sortDirection?: {
    title?: string;
    asc?: string;
    desc?: string;
  };
};

interface IFolderGroupMenuProps {
  className?: string;
  strings?: FolderGroupStrings;

  groupBy: FolderGroupBy;
  setGroupBy: (group: FolderGroupBy) => void;

  sortDirection: FolderSortDirection;
  setSortDirection: (direction: FolderSortDirection) => void;
}

export function FolderGroupMenu(props: Readonly<IFolderGroupMenuProps>) {
  const {
    className,
    strings = {
      text: "Configurações",
      groupBy: {
        title: "Agrupado por",
        none: "Remover agrupamento",
        firstLetter: "Primeira Letra",
        date: "Data de Modificação",
      },
      sortDirection: {
        title: "Ordenar por",
        asc: "Crescente",
        desc: "Decrescente",
      },
    },
    groupBy,
    setGroupBy,
    sortDirection,
    setSortDirection,
  } = props;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-medium text-xs">
            {strings?.groupBy?.title}
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setGroupBy("none")}
            disabled={groupBy === "none"}
          >
            <CircleX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {strings?.groupBy?.none}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setGroupBy("first-letter")}
            disabled={groupBy === "first-letter"}
          >
            <CaseUpper className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {strings?.groupBy?.firstLetter}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setGroupBy("date")}
            disabled={groupBy === "date"}
          >
            <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {strings?.groupBy?.date}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="font-medium text-xs">
            {strings?.sortDirection?.title}
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setSortDirection("asc")}
            disabled={sortDirection === "asc"}
          >
            <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {strings?.sortDirection?.asc}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setSortDirection("desc")}
            disabled={sortDirection === "desc"}
          >
            <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 transform rotate-180" />
            {strings?.sortDirection?.desc}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
