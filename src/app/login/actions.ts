"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (!data?.user) {
    redirect("/login?error=true");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function twitterLogin() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: process.env.BASE_URL + "/auth/callback",
    },
  });

  if (error) {
    redirect("/login?error=true");
  }

  redirect(data.url);
}
