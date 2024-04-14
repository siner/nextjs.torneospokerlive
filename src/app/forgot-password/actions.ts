"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function forgotpassword(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;

  const base_url = process.env.BASE_URL;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: base_url + "/reset-password",
  });

  revalidatePath("/forgot-password", "layout");
  redirect("/forgot-password?success=true");
}
