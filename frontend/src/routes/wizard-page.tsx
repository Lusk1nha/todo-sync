import { LogoMark } from "@/components/logo-mark/logo-mark";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";

export function WizardPage() {
  return (
    <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-3xl text-center items-center justify-center flex flex-wrap">
          <span className="flex-wrap">Bem vindo,</span>
          <span className="ml-2 font-bold">Lucas!</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Vamos configurar algumas coisas antes de começar.
        </h2>
        <h2 className="mt-2 text-center text-sm text-muted-foreground">
          Essa configuração pode ser alterada a qualquer momento nas
          configurações do sistema.
        </h2>
      </div>

      <Separator />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Configuração inicial</CardTitle>
          <CardDescription>
            Vamos configurar algumas coisas antes de começar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <FormLabel>Nome de Usuário</FormLabel> */}
        </CardContent>
      </Card>

      <Button className="w-full" type="button">
        Estou pronto para começar!
      </Button>

      <div className="mt-8">
        <LogoMark />
      </div>
    </div>
  );
}
