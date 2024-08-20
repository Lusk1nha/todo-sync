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
import { LogoMark } from "@/components/logo-mark/logo-mark";
import { UsersService } from "@/shared/services/users-service";

export default function RegisterUserRoute() {
  const { createUser } = new UsersService();

  async function handleRegister(data: RegisterUserSchemaType) {
    RegisterUserSchema.parse(data);

    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await createUser(newUser);
  }

  return (
    <div className="max-w-[420px] w-full flex flex-col items-center justify-center gap-8">
      <LogoMark />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cadastrar nova conta</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterUserForm onSubmit={handleRegister} />
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
