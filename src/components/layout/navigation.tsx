"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
// Importar iconos de lucide-react
import {
  Network,
  CalendarDays,
  Trophy,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// Añadir icono a la definición de enlaces
const navLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/circuitos", label: "Circuitos", icon: Network },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/torneos", label: "Torneos", icon: Trophy },
  { href: "/casinos", label: "Casinos", icon: Landmark },
];

interface NavigationProps {
  isMobile?: boolean; // Prop opcional para indicar si es el menú móvil
}

export default function Navigation({ isMobile = false }: NavigationProps) {
  const pathname = "/" + usePathname().split("/")[1]; // Añadir / inicial para comparación

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon; // Componente de icono

        // Clases base para todos los enlaces
        let linkClasses =
          "flex items-center gap-2 transition-colors hover:text-foreground";

        if (isMobile) {
          // Estilos específicos para móvil (más grandes, como estaban)
          linkClasses += ` text-lg ${
            isActive ? "text-foreground font-medium" : "text-muted-foreground"
          }`;
        } else {
          // Estilos para desktop: padding, borde redondeado, fondo en hover, fuente medium si activo
          linkClasses += ` rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
            isActive
              ? "text-foreground font-medium bg-accent"
              : "text-muted-foreground"
          }`;
          // Añadido bg-accent también al estado activo para consistencia
        }

        const linkContent = (
          <Link key={link.href} href={link.href} className={linkClasses}>
            <Icon className="h-5 w-5" /> {/* Renderizar icono */}
            {link.label}
          </Link>
        );

        // Envolver con SheetClose si estamos en el menú móvil
        return isMobile ? (
          <SheetClose key={link.href} asChild>
            {linkContent}
          </SheetClose>
        ) : (
          linkContent
        );
      })}
    </>
  );
}
