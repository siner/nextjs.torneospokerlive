"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function resetpassword(formData: FormData) {
  const supabase = createClient();

  const password = formData.get("password") as string;

  const refreshToken = formData.get("refresh_token") as string;
  const accessToken = formData.get("access_token") as string;

  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const { data: user, error: usererror } = await supabase.auth.updateUser({
    password: password,
  });

  if (!user) {
    redirect("/login?error=true");
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}
