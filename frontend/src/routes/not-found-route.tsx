import { Button } from "@/components/ui/button";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { LogIn, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFoundRoute() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(RoutesEnum.ROOT);
  }

  return (
    <div className="container h-full flex items-center justify-center">
      <div className="max-w-[600px] flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center">
          <SearchX className="text-primary w-20 h-20 md:w-32 md:h-32" />
          <h1 className="text-xl md:text-2xl font-medium text-center mt-4">
            Página não encontrada
          </h1>
          <p className="text-xs md:text-base text-center text-muted-foreground">
            A página que você está procurando não existe. <br />
            Por favor, verifique o endereço digitado e tente novamente.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleRedirect}
          variant="outline"
          className="gap-2"
        >
          <LogIn className="w-4 h-4 md:w-6 md:h-6" />
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
}
