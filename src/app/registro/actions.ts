"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signUp(user);

  if (data.user) {
    revalidatePath("/login", "layout");
    redirect("/login?success=true");
  }

  revalidatePath("/registro", "layout");
  redirect("/registro?error=true");
}
