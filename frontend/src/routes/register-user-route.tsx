import { DevText } from "@/components/utilities/dev-text/dev-text";
import { RegisterUserForm } from "@/components/forms/register-user-form/register-user-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from "@/shared/schemas/register-user-schema";
import { ListTodo } from "lucide-react";

export default function RegisterUserRoute() {
  function handleRegister(data: RegisterUserSchemaType) {
    console.log(data);
    RegisterUserSchema.parse(data);
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
          <CardTitle>Cadastrar</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterUserForm onSubmit={handleRegister} />
        </CardContent>
        <CardFooter className="flex items-center justify-center text-center">
          <p className="text-xs">
            Developed by <DevText>Lucas Pedro</DevText>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
