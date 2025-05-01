import { getPosts } from "@/lib/supabase/queries/posts";
import { getCategoryBySlug } from "@/lib/supabase/queries/categories";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/news/PostCard";
import { PaginationControls } from "@/components/news/PaginationControls";
import { POSTS_PER_PAGE } from "@/lib/supabase/queries/posts";
import type { Metadata, ResolvingMetadata } from "next";

// Revalidar cada hora (o el tiempo que consideres adecuado)
export const revalidate = 3600;

// Definir props para recibir params y searchParams
type CategoryArchivePageProps = {
  params: {
    slug: string; // Slug de la categoría
  };
  searchParams: {
    page?: string; // Número de página
  };
};

// Generar Metadata dinámico para la página de archivo de categoría
export async function generateMetadata(
  { params }: CategoryArchivePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Categoría no encontrada",
    };
  }

  const siteBaseUrl = "https://www.torneospokerlive.com";
  const categoryUrl = `${siteBaseUrl}/noticias/categoria/${slug}`;
  const title = `Noticias de ${category.name}`;
  const description = `Explora las últimas noticias y artículos publicados en la categoría ${category.name} en Torneos Poker Live.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: categoryUrl,
      siteName: "Torneos Poker Live",
      type: "website", // Es una página de archivo, no un artículo individual
      locale: "es_ES",
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryArchivePage({
  params,
  searchParams,
}: CategoryArchivePageProps) {
  const categorySlug = params.slug;

  // Obtener detalles de la categoría
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    notFound(); // Mostrar 404 si la categoría no existe
  }

  // Leer y validar el número de página
  const currentPage = parseInt(searchParams.page || "1", 10);
  const page = Math.max(1, currentPage);

  // Obtenemos los posts y el total para esta categoría y página
  const { posts, totalCount } = await getPosts({ categorySlug, page });

  const pageTitle = `Noticias de ${category.name}`;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">{pageTitle}</h1>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <p>No hay noticias publicadas en esta categoría por el momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Controles de paginación */}
      {totalCount > POSTS_PER_PAGE && (
        <PaginationControls
          currentPage={page}
          totalCount={totalCount}
          perPage={POSTS_PER_PAGE}
        />
      )}
    </div>
  );
}
