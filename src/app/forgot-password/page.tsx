import { forgotpassword } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ForgotPasswordForm({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const success = searchParams?.success;
  return (
    <form className="flex items-center justify-center mt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">He olvidado mi contraseña</CardTitle>
          <CardDescription>
            Introduce tu email para recuperar contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {success && (
              <div className="text-green-500 text-sm">
                Se ha enviado un email con instrucciones
              </div>
            )}
            <Button
              formAction={forgotpassword}
              type="submit"
              className="w-full"
            >
              Recuperar contraseña
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
