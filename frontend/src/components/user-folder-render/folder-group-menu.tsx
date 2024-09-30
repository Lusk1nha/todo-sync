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
      text: "Agrupar por",
    },
    setGroupBy,
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
          <DropdownMenuLabel className="text-xs">
            Agrupar as pastas por
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setGroupBy("none")}>
            <CircleX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Remover agrupamento
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setGroupBy("first-letter")}>
            <CaseUpper className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Primeira Letra
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setGroupBy("date")}>
            <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Data de Modificação
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs">
            Ordenar as pastas por
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setSortDirection("asc")}>
            <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Crescente
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setSortDirection("desc")}>
            <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 transform rotate-180" />
            Decrescente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
