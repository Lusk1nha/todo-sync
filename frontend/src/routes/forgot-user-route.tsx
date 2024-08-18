import { ForgotUserForm } from "@/components/forms/forgot-user-form/forgot-user-form";
import { LogoMark } from "@/components/logo-mark/logo-mark";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DevText } from "@/components/utilities/dev-text/dev-text";
import {
  ForgotUserSchema,
  ForgotUserSchemaType,
} from "@/shared/schemas/forgot-user-schema";

export default function ForgotUserRoute() {
  function handleResetPassword(data: ForgotUserSchemaType) {
    ForgotUserSchema.parse(data);

    console.log(data);
  }

  return (
    <div className="max-w-[420px] w-full flex flex-col items-center justify-center gap-8">
      <LogoMark />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resetar senha da conta</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotUserForm onSubmit={handleResetPassword} />
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
