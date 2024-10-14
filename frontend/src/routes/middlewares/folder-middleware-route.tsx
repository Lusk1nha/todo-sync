import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFolder } from "@/shared/hooks/use-folder";
import { useParams } from "react-router-dom";
import { FolderRoute } from "../folder-route";

import { FolderX } from "lucide-react";
import { FolderPageParams } from "@/shared/types";

export function FolderMiddlewareRoute() {
  const { folderId } = useParams<FolderPageParams>();

  const { folder, isLoading, isError } = useFolder(folderId);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p>Buscando informações da pasta...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <FolderX className="text-destructive w-20 h-20 md:w-32 md:h-32" />
          <h1 className="text-xl md:text-2xl font-medium text-center mt-4">
            Pasta não encontrada
          </h1>
          <p className="text-xs md:text-base text-center text-muted-foreground">
            A pasta que você está procurando não existe ou você não tem
            permissão. <br />
          </p>
        </div>
      </div>
    );
  }

  if (!folder) {
    return null;
  }

  return <FolderRoute folder={folder} />;
}
