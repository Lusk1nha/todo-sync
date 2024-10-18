import { FolderX } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { DelayButton } from "../buttons/delay-button";

interface IDeleteFolderDialogProps {
  folderId: string;
}

export function DeleteFolderDialog(props: Readonly<IDeleteFolderDialogProps>) {
  const { folderId } = props;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: onDeleteFolder,
    onSuccess() {
      toast({
        title: "Pasta excluída com sucesso",
        variant: "default",
      });
    },
    onError(error) {
      toast({
        title: "Erro ao excluir pasta",
        variant: "destructive",
        description: error.message,
      });
    },
    onSettled() {
      setIsDialogOpen(false);
    },
  });

  async function onDeleteFolder(): Promise<void> {
    // Implement delete folder logic
    console.log("Deleting folder with ID:", folderId);
  }

  function onDismiss() {
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" type="button" variant="destructive" className="gap-2">
          <FolderX className="w-4 h-4" />
          Excluir pasta
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir pasta</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir essa pasta? Essa ação é irreversível.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex items-center justify-between">
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={onDismiss}
          >
            Cancelar
          </Button>

          <DelayButton
            size="sm"
            type="button"
            variant="destructive"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Excluir pasta
          </DelayButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
