import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TagProps {
  tag: {
    name: string;
    slug: string;
  };
  // Podríamos añadir props para personalizar variant, tamaño, etc.
}

export function Tag({ tag }: TagProps) {
  // Generamos la URL para la página de archivo del tag
  const tagUrl = `/noticias/tag/${tag.slug}`;

  return (
    <Link href={tagUrl}>
      {/* Usamos variant="outline" por defecto para diferenciarlo de categorías */}
      <Badge
        variant="outline"
        className="transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {tag.name}
      </Badge>
    </Link>
  );
}
