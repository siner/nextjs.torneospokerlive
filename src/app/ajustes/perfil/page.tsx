import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountForm from "./profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function PerfilPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tu información de perfil y foto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountForm user={data.user} />
        </CardContent>
      </Card>
    </div>
  );
}
