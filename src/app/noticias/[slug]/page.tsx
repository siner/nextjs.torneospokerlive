/* eslint-disable @next/next/no-img-element */
import {
  getPostBySlug,
  PostWithAuthorCategoryAndTags,
} from "@/lib/supabase/queries/posts";
import { getCommentsByPostId } from "@/lib/supabase/queries/comments";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { CommentSection } from "@/components/news/CommentSection";
import { Tag } from "@/components/news/Tag";
import { CategoryBadge } from "@/components/news/CategoryBadge";
import type { Metadata, ResolvingMetadata } from "next";

// Revalidar la página cada hora
export const revalidate = 3600;

// Definimos el tipo para las props, incluyendo los params
type PostPageProps = {
  params: {
    slug: string;
  };
};

// Función auxiliar para extraer texto plano de HTML (simple)
function extractPlainText(htmlString: string | null | undefined): string {
  if (!htmlString) return "";
  // Elimina etiquetas HTML y decodifica entidades HTML comunes
  return htmlString
    .replace(/<[^>]*>/g, " ") // Reemplaza etiquetas con espacio
    .replace(/\s{2,}/g, " ") // Reemplaza múltiples espacios con uno
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
    .substring(0, 160); // Limitar a 160 caracteres para descripción
}

// Generar Metadata dinámico
export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Noticia no encontrada",
    };
  }

  const siteBaseUrl = "https://www.torneospokerlive.com"; // URL Base del sitio
  const postUrl = `${siteBaseUrl}/noticias/${slug}`;
  const imageUrl = post.featured_image_url
    ? `${post.featured_image_url}`
    : `${siteBaseUrl}/opengraph-image.jpg`; // Usar imagen destacada o imagen por defecto
  const description = extractPlainText(post.content);

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: postUrl,
      siteName: "Torneos Poker Live", // Nombre del sitio
      images: [
        {
          url: imageUrl,
          // Añadir width y height si se conocen
        },
      ],
      locale: "es_ES",
      type: "article",
      publishedTime: post.published_at ?? post.created_at, // Fecha de publicación
      tags: post.tags?.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
      creator: "@livetorneos",
    },
    alternates: {
      canonical: postUrl, // URL canónica
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  // Si no se encuentra el post, mostrar página 404
  if (!post) {
    notFound();
  }

  // Obtener comentarios una vez que sabemos que el post existe
  const comments = await getCommentsByPostId(post.id);

  // Ya no procesamos el contenido, usamos el HTML directamente
  const contentHtml = post.content || ""; // Usar directamente el contenido

  return (
    <article className="prose prose-lg dark:prose-invert mx-auto py-8">
      {/* Encabezado del Post */}
      <h1 className="mb-4 text-3xl md:text-4xl font-bold">{post.title}</h1>
      <div className="text-muted-foreground mb-6 text-base">
        <span>Publicado el </span>
        <time dateTime={post.published_at ?? post.created_at}>
          {format(
            new Date(post.published_at ?? post.created_at),
            "dd MMMM yyyy",
            { locale: es }
          )}
        </time>
        {post.blog_categories && (
          <>
            <span> en </span>
            {/* TODO: Enlazar a categoría */}
            <CategoryBadge category={post.blog_categories} />
          </>
        )}
      </div>

      {/* Imagen Destacada (si existe) */}
      {post.featured_image_url && (
        <div className="relative w-full h-64 md:h-96 mb-8">
          {/* Usamos <img> como fallback por problemas previos con next/image */}
          <img
            src={post.featured_image_url}
            alt={`Imagen destacada para ${post.title}`}
            className="object-cover w-full h-full rounded-lg object-bottom"
          />
        </div>
      )}

      {/* Contenido del Post */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* Mostrar Tags si existen */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 items-center not-prose">
          <span className="text-sm font-medium text-muted-foreground">
            Tags:
          </span>
          {post.tags.map((tag) => (
            <Tag key={tag.slug} tag={tag} />
          ))}
        </div>
      )}

      {/* Sección de Comentarios ahora usa el componente */}
      <CommentSection comments={comments} postId={post.id} />
    </article>
  );
}
