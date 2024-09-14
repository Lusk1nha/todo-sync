import { AlertCircle } from "lucide-react";
import { Button } from "../../ui/button";

type ErrorFormStrings = {
  errorTitle: string;
  returnButton: string;
};

interface IErrorFormProps {
  error: Error;

  onReturn?: () => void;

  strings?: ErrorFormStrings;
}

export function ErrorFormReturn(props: Readonly<IErrorFormProps>) {
  const {
    error,
    strings = {
      errorTitle: "Erro ao realizar ação",
      returnButton: "Voltar para tela anterior",
    },
    onReturn,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-auto flex flex-col items-center justify-center py-6 gap-2">
        <AlertCircle className="text-destructive w-16 h-16" />
        <div className="flex flex-col gap-1 text-center">
          <p className="text-sm font-medium">{strings.errorTitle}</p>
          <div className="text-xs text-neutral-500">{error.message}</div>
        </div>
      </div>

      {onReturn && (
        <Button type="button" onClick={onReturn}>
          {strings.returnButton}
        </Button>
      )}
    </div>
  );
}
