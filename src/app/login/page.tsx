import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Login from "./form-login";

export default async function LoginForm() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
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
            <Login />
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
