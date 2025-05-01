import { getPosts } from "@/lib/supabase/queries/posts";
import { getCategories } from "@/lib/supabase/queries/categories";
import { getTags } from "@/lib/supabase/queries/tags";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar locale español
import { PostCard } from "@/components/news/PostCard"; // Importar el nuevo componente
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Importar Card para filtros
import { PaginationControls } from "@/components/news/PaginationControls"; // Importar controles de paginación
import { POSTS_PER_PAGE } from "@/lib/supabase/queries/posts"; // Importar constante

// Revalidar cada hora (o el tiempo que consideres adecuado)
export const revalidate = 3600;

// Definir props para recibir searchParams
type NoticiasPageProps = {
  searchParams: {
    categoria?: string; // Slug de la categoría
    tag?: string; // Slug del tag
    page?: string; // Número de página
  };
};

export default async function NoticiasPage({
  searchParams,
}: NoticiasPageProps) {
  const categorySlug = searchParams.categoria;
  const tagSlug = searchParams.tag;
  // Leer y validar el número de página
  const currentPage = parseInt(searchParams.page || "1", 10);
  if (isNaN(currentPage) || currentPage < 1) {
    // Redirigir o mostrar error si la página no es válida (opcional)
    // Por ahora, usaremos la página 1
  }
  const page = Math.max(1, currentPage); // Asegurar que la página sea al menos 1

  // Obtenemos los posts y el total, pasando los filtros y la página
  const { posts, totalCount } = await getPosts({ categorySlug, tagSlug, page });

  // Obtenemos todas las categorías y tags para mostrarlos como opciones de filtro
  const categories = await getCategories();
  const tags = await getTags();

  // Determinar el título de la página basado en el filtro
  let pageTitle = "Noticias";
  if (categorySlug) {
    const categoryName = categories.find((c) => c.slug === categorySlug)?.name;
    pageTitle = `Noticias de ${categoryName || categorySlug}`;
  }
  if (tagSlug) {
    const tagName = tags.find((t) => t.slug === tagSlug)?.name;
    pageTitle = `Noticias con la etiqueta ${tagName || tagSlug}`;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>

      {/* Sección para mostrar filtros */}
      <div className="flex flex-col md:flex-row gap-8 pb-6 mb-6">
        {(categories.length > 0 || tags.length > 0) && (
          <aside className="w-full md:w-1/4 flex flex-col gap-6">
            {/* Filtros por Categoría */}
            {categories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {/* Añadir enlace para quitar filtro */}
                    <li>
                      <Link
                        href="/noticias"
                        className={`text-sm hover:text-primary ${
                          !categorySlug
                            ? "font-bold text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        Todas
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/noticias?categoria=${c.slug}`}
                          className={`text-sm hover:text-primary ${
                            categorySlug === c.slug
                              ? "font-bold text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            {/* Filtros por Tags */}
            {tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {/* Añadir enlace para quitar filtro */}
                    <li>
                      <Link
                        href="/noticias"
                        className={`text-sm hover:text-primary ${
                          !tagSlug
                            ? "font-bold text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        Todos
                      </Link>
                    </li>
                    {tags.map((t) => (
                      <li key={t.id}>
                        <Link
                          href={`/noticias?tag=${t.slug}`}
                          className={`text-sm hover:text-primary ${
                            tagSlug === t.slug
                              ? "font-bold text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </aside>
        )}
        {/* Columna principal para los posts */}
        <div
          className={`w-full ${
            categories.length > 0 || tags.length > 0 ? "md:w-3/4" : ""
          }`}
        >
          {/* Aquí va la lista de posts */}
          {posts.length === 0 ? (
            <p>No hay noticias que coincidan con los filtros seleccionados.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          {/* Añadir controles de paginación si hay posts */}
          {totalCount > 0 && (
            <PaginationControls
              currentPage={page}
              totalCount={totalCount}
              perPage={POSTS_PER_PAGE}
            />
          )}
        </div>
      </div>
    </div>
  );
}
