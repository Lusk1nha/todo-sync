import { CreateFolderColumnDialog } from "../dialogs/create-folder-column-dialog";

interface IEmptyFolderColumnsProps {
  folderId: string;
}

export function EmptyFolderColumns(props: Readonly<IEmptyFolderColumnsProps>) {
  const { folderId } = props;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-center text-secondary-foreground text-lg font-medium">
        Essa pasta está vazia. Crie uma nova coluna para começar.
      </h1>

      <CreateFolderColumnDialog folderId={folderId} />
    </div>
  );
}
