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
  SortAsc,
  SortDesc,
} from "lucide-react";

type FolderGroupStrings = {
  text?: string;
};

interface IFolderGroupButtonProps {
  className?: string;
  strings?: FolderGroupStrings;

  groupBy: FolderGroupBy;
  setGroupBy: (group: FolderGroupBy) => void;

  sortDirection: FolderSortDirection;
  setSortDirection: (direction: FolderSortDirection) => void;
}

export function FolderGroupButton(props: Readonly<IFolderGroupButtonProps>) {
  const {
    className,
    strings = {
      text: "Agrupar por",
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
            variant="secondary"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{strings.text}</span>

            {sortDirection === "asc" ? (
              <SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <SortDesc className="ml-2 h-4 w-4 transform rotate-180" />
            )}
            <GroupingIcon type={groupBy} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setGroupBy("none")}>
            <CircleX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Sem agrupar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setGroupBy("first-letter")}>
            <CaseUpper className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Nome
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setGroupBy("date")}>
            <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Data de Modificação
          </DropdownMenuItem>

          <DropdownMenuSeparator />
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

interface IGroupingIconProps {
  type: FolderGroupBy;
}

function GroupingIcon(props: Readonly<IGroupingIconProps>) {
  const { type } = props;

  if (type === "date") {
    return <CalendarDays className="ml-2 h-4 w-4" />;
  }

  if (type === "first-letter") {
    return <CaseUpper className="ml-2 h-4 w-4" />;
  }

  return null;
}
