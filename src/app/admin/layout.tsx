import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const role = await supabase
    .from("user_roles")
    .select("role, user_id")
    .eq("user_id", data.user.id);

  if (role.error || role.data.length === 0) {
    redirect("/error");
  }
  if (role.data[0].role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
