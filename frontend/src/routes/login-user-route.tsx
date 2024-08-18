import { LoginUserForm } from "@/components/forms/login-user-form/login-user-form";
import { LogoMark } from "@/components/logo-mark/logo-mark";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DevText } from "@/components/utilities/dev-text/dev-text";
import {
  LoginUserSchema,
  LoginUserSchemaType,
} from "@/shared/schemas/login-user-schema";

export default function LoginRoute() {
  function handleLogin(data: LoginUserSchemaType) {
    LoginUserSchema.parse(data);
    console.log(data);
  }

  return (
    <div className="max-w-[420px] w-full flex flex-col items-center justify-center gap-8">
      <LogoMark />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar no sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUserForm onSubmit={handleLogin} />
        </CardContent>
        <CardFooter className="flex items-center justify-center text-center">
          <p className="text-xs font-medium">
            Developed by <DevText>Lucas Pedro</DevText>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
