import { LoginUserForm } from "@/components/forms/login-user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LoginUserSchema,
  LoginUserSchemaType,
} from "@/shared/schemas/login-user-schema";
import { ListTodo } from "lucide-react";

export default function LoginRoute() {
  function handleLogin(data: LoginUserSchemaType) {
    console.log(data);
    LoginUserSchema.parse(data);
  }

  return (
    <div className="max-w-[400px] w-full flex flex-col items-center justify-center gap-8">
      <div className="text-primary flex items-center gap-2">
        <ListTodo className="w-8 h-8" />
        <h1 className="text-3xl font-bold">
          <span>Todo</span> Sync
        </h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar no Aplicativo</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUserForm onSubmit={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
}
