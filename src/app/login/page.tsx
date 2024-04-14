import { login, twitterLogin } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Link from "next/link";

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
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export default async function LoginForm({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();

  const fail = searchParams?.error;
  const success = searchParams?.success;

  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/admin");
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Entrar con tu cuenta de correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form className="grid gap-4">
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {fail && (
                <div className="text-red-500 text-sm">
                  Credenciales incorrectas
                </div>
              )}
              {success && (
                <div className="text-green-600 text-sm">
                  <p>Usuario registrado con éxito.</p>
                  <p>
                    Recibirás un email de confirmación. Por favor, revisa tu
                    bandeja de entrada o spam.
                  </p>
                </div>
              )}
              <Button formAction={login} type="submit" className="w-full">
                Login
              </Button>
            </form>
            <form>
              <Button
                formAction={twitterLogin}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white"
              >
                <TwitterLogoIcon className="w-6 h-6" /> Login con Twitter
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Si no tienes cuenta, puedes{" "}
            <Link href="/registro" className="underline">
              Registrarte
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="underline">
              He olvidado mi contraseña
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
