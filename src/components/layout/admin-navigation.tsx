"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building,
  CalendarClock,
  CalendarDays,
  Home,
  Trophy,
} from "lucide-react";
import { Badge } from "../ui/badge";

export default function AdminNavigation() {
  const pathname = usePathname().split("/")[2];

  return (
    <>
      <Link
        href="/admin"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/admin/casinos"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Building className="h-4 w-4" />
        Casinos
        {/*        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
  */}
      </Link>
      <Link
        href="/admin/circuitos"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Trophy className="h-4 w-4" />
        Circuitos
      </Link>
      <Link
        href="/admin/eventos"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <CalendarDays className="h-4 w-4" />
        Eventos
      </Link>
      <Link
        href="/admin/torneos"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <CalendarClock className="h-4 w-4" />
        Torneos
      </Link>
    </>
  );
}
