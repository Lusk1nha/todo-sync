import { FolderColumn } from "@/shared/factories/folders-columns-factory";

interface IFolderColumnRenderProps {
  column: FolderColumn;
  color?: string;
}

export function FolderColumnRender(props: Readonly<IFolderColumnRenderProps>) {
  const { column, color } = props;

  return (
    <div className="min-w-[240px] flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div
          className={"bg-primary w-4 h-4 rounded-full"}
          style={{
            backgroundColor: color,
          }}
        />
        <h2 className="text-muted-foreground text-sm font-medium uppercase tracking-[2.4px]">
          {column.name} (?)
        </h2>
      </div>
    </div>
  );
}
