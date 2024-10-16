import { Badge } from "@/components/ui/badge";
import { ServerCrash } from "lucide-react";

interface IErrorGetFolderColumnsProps {
  error: Error | null;
}

export function ErrorGetFolderColumns(
  props: Readonly<IErrorGetFolderColumnsProps>
) {
  const { error } = props;

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-4">
      <ServerCrash className="w-20 h-20 text-destructive" />

      <div className="flex flex-col gap-1">
        <h1 className="text-center text-secondary-foreground text-base font-medium">
          Ocorreu um erro ao tentar carregar as colunas
        </h1>

        <Badge
          variant="destructive"
          className="text-center items-center justify-center py-1"
        >
          {error?.message ?? "Erro desconhecido"}
        </Badge>
      </div>
    </div>
  );
}
