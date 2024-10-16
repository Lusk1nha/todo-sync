import { Skeleton } from "../../ui/skeleton";

interface IColumnsSkeletonProps {
  name: string;
  total: number;
}

export function FolderColumnsSkeleton(props: Readonly<IColumnsSkeletonProps>) {
  const { name, total } = props;

  return (
    <div className="h-full flex gap-6 p-6">
      {[...Array(total)].map((_, index) => (
        <div key={name + index} className="min-w-[280px] h-full">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
