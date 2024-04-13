import { resetpassword } from "./actions";
import { redirect } from "next/navigation";
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
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordForm({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();

  const session = await supabase.auth.exchangeCodeForSession(
    searchParams?.code as string
  );

  return (
    <form className="flex items-center justify-center mt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Restaurar contraseña</CardTitle>
          <CardDescription>Pon una contraseña nueva</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <input
              type="hidden"
              name="access_token"
              value={session?.data?.session?.access_token}
            />
            <input
              type="hidden"
              name="refresh_token"
              value={session?.data?.session?.refresh_token}
            />

            <Button formAction={resetpassword} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
