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
import {
  User,
  Star,
  Trophy,
  LayoutDashboard,
  CalendarDays,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";

async function getCurrentPath() {
  return null; // Lo manejaremos en el componente cliente
}

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

  const menuItems = [
    {
      href: "/ajustes",
      label: "Panel de control",
      icon: LayoutDashboard,
    },
    {
      href: "/ajustes/perfil",
      label: "Mi perfil",
      icon: User,
    },
    {
      href: "/ajustes/mis-casinos",
      label: "Mis casinos",
      icon: Star,
    },
    {
      href: "/ajustes/mis-torneos",
      label: "Mis torneos",
      icon: Trophy,
    },
    {
      href: "/ajustes/mis-eventos",
      label: "Mis eventos",
      icon: CalendarDays,
    },
    {
      href: "/ajustes/mis-circuitos",
      label: "Mis circuitos",
      icon: CircleDot,
    },
  ];

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Ajustes</h1>
        <p className="text-muted-foreground">
          Gestiona tu perfil y tus favoritos
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <nav className="grid gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <>{children}</>
      </div>
      <Toaster />
    </main>
  );
}
