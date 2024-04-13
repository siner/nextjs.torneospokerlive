import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountForm from "./profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function Ajustes() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Mis datos de perfil</CardTitle>
          <CardDescription>Modificar mis datos</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountForm user={data.user} />
        </CardContent>
      </Card>
    </div>
  );
}
