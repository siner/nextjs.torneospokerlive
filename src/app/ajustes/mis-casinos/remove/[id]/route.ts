import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("casino_stars")
      .delete()
      .eq("user_id", user?.data?.user?.id)
      .eq("casino_id", id);
    if (error) throw error;
  }
  revalidatePath("/ajustes/mis-casinos", "layout");
  redirect("/ajustes/mis-casinos");
}
