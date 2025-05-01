import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: {
    name: string;
    slug: string;
  };
  // Podríamos añadir props para personalizar variant, tamaño, etc. si fuera necesario
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  // Generamos la URL para la página de archivo de la categoría
  const categoryUrl = `/noticias/categoria/${category.slug}`;

  return (
    <Link href={categoryUrl}>
      {/* Usamos variant="secondary" para diferenciarlo de otros badges */}
      <Badge
        variant="secondary"
        className="transition-colors hover:bg-secondary/80"
      >
        {category.name}
      </Badge>
    </Link>
  );
}
