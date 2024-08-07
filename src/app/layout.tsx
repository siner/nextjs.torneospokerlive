import type { Metadata } from "next";
import Script from 'next/script'
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
import Header from "@/components/layout/header";
export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 px-4 pb-4 bg-muted/40">
            {children}
          </main>
          <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="de03ef4a-a7c8-4e91-a732-ba7f5a95ecea"
          strategy="beforeInteractive"
        />
        </div>
      </body>
    </html>
  );
}
