import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ILoadingFormReturn {
  label?: string;
}

export function LoadingFormReturn(props: Readonly<ILoadingFormReturn>) {
  const { label = "Criando usuário" } = props;

  return (
    <div className="w-full h-56 flex flex-col items-center justify-center gap-2">
      <LoadingSpinner />
      <p>
        <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}
