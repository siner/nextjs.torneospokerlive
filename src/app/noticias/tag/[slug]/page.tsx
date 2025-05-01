import { getPosts } from "@/lib/supabase/queries/posts";
import { getTagBySlug } from "@/lib/supabase/queries/tags"; // Importar función de tags
import { notFound } from "next/navigation";
import { PostCard } from "@/components/news/PostCard";
import { PaginationControls } from "@/components/news/PaginationControls";
import { POSTS_PER_PAGE } from "@/lib/supabase/queries/posts";
import type { Metadata, ResolvingMetadata } from "next";

// Revalidar cada hora
export const revalidate = 3600;

// Definir props para recibir params y searchParams
type TagArchivePageProps = {
  params: {
    slug: string; // Slug del tag
  };
  searchParams: {
    page?: string; // Número de página
  };
};

// Generar Metadata dinámico para la página de archivo de tag
export async function generateMetadata(
  { params }: TagArchivePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: "Etiqueta no encontrada",
    };
  }

  const siteBaseUrl = "https://www.torneospokerlive.com";
  const tagUrl = `${siteBaseUrl}/noticias/tag/${slug}`;
  const title = `Noticias con la etiqueta ${tag.name}`;
  const description = `Explora las últimas noticias y artículos con la etiqueta ${tag.name} en Torneos Poker Live.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: tagUrl,
      siteName: "Torneos Poker Live",
      type: "website",
      locale: "es_ES",
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
    },
    alternates: {
      canonical: tagUrl,
    },
  };
}

export default async function TagArchivePage({
  params,
  searchParams,
}: TagArchivePageProps) {
  const tagSlug = params.slug;

  // Obtener detalles del tag
  const tag = await getTagBySlug(tagSlug);
  if (!tag) {
    notFound(); // Mostrar 404 si el tag no existe
  }

  // Leer y validar el número de página
  const currentPage = parseInt(searchParams.page || "1", 10);
  const page = Math.max(1, currentPage);

  // Obtenemos los posts y el total para este tag y página
  const { posts, totalCount } = await getPosts({ tagSlug, page });

  const pageTitle = `Noticias con la etiqueta #${tag.name}`;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">{pageTitle}</h1>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <p>No hay noticias publicadas con esta etiqueta por el momento.</p>
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
