import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStarredCasinos } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { Casino, columns } from "./columns";

export const revalidate = 1;

export default async function Ajustes() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }
  const casinos = await getStarredCasinos(data.user.id);

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Mis casinos favoritos</CardTitle>
          <CardDescription>Modificar mis casinos</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={casinos} />
        </CardContent>
      </Card>
    </div>
  );
}
