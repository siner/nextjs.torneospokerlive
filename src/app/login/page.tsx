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
          <Login />
        </CardContent>
      </Card>
    </div>
  );
}
