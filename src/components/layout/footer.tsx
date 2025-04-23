import Link from "next/link";
import { MailIcon } from "lucide-react"; // Usar MailIcon de lucide para consistencia
import { TwitterLogoIcon } from "@radix-ui/react-icons"; // Mantener este o cambiar a lucide si se prefiere

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-6 px-4 md:px-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Torneos Poker Live. Todos los derechos
          reservados.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/livetorneos"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Twitter de Torneos Poker Live"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <TwitterLogoIcon className="h-5 w-5" />
          </a>
          <Link
            href="/contacto"
            aria-label="Página de contacto"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <MailIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
