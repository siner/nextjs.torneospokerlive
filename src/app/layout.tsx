import type { Metadata } from "next";
import Script from "next/script";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Torneos Poker Live",
  description: "",
  metadataBase: new URL(
    process.env.BASE_URL || "https://www.torneospokerlive.com"
  ),
};

export const runtime = "edge";

// Fallback simple para el Header mientras carga
function HeaderFallback() {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50"></header>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  var logged = false;
  var avatar = null;
  const { data } = await supabase.auth.getUser();
  var role = null;
  var avatarName = data?.user?.email;
  if (data?.user) {
    logged = true;
    role = await supabase
      .from("user")
      .select("role, username, avatar")
      .eq("id", data?.user?.id);
    if (!role.error && role.data.length !== 0) {
      if (role.data[0].username) avatarName = role.data[0].username;
      if (role.data[0].avatar) avatar = role.data[0].avatar;
    }
  }
  var user = {
    logged: logged,
    avatar: avatar,
    avatarName: avatarName,
  };
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <Suspense fallback={<HeaderFallback />}>
          <Header user={user} />
        </Suspense>
        <main className="flex-grow bg-muted/40 py-4">
          <div className="container mx-auto">{children}</div>
        </main>
        <Footer />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="de03ef4a-a7c8-4e91-a732-ba7f5a95ecea"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
