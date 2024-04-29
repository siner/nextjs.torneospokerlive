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
import Register from "./form-register";

export default async function LoginForm() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/admin");
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Registrarse</CardTitle>
          <CardDescription>
            Registrarse con tu email y contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Register />
          <div className="mt-4 text-center text-sm">
            Si ya tienes cuenta, puedes{" "}
            <Link href="/login" className="underline">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
