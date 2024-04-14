import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Ajustes",
  description: "Ajustes",
};

import * as React from "react";

import Link from "next/link";
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

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Ajustes</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="/ajustes" className="font-semibold text-primary">
            Perfil
          </Link>
          <Link
            href="/ajustes/mis-casinos"
            className="font-semibold text-primary"
          >
            Mis casinos
          </Link>
        </nav>
        <>{children}</>
      </div>
      <Toaster />
    </main>
  );
}
