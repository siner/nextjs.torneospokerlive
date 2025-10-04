/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { PostWithAuthorAndCategory } from "@/lib/supabase/queries/posts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CategoryBadge } from "@/components/news/CategoryBadge";
import { MessageSquare, Calendar } from "lucide-react";

interface PostCardProps {
  post: PostWithAuthorAndCategory;
}

export function PostCard({ post }: PostCardProps) {
  const postUrl = `/noticias/${post.slug}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden group">
      {/* Imagen Destacada */}
      {post.featured_image_url && (
        <Link href={postUrl} className="block overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={`Imagen para ${post.title}`}
            // Aspect ratio 16:9, object-cover para llenar, scale en hover
            className="aspect-video w-full object-cover object-bottom transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </Link>
      )}

      <CardHeader>
        {post.blog_categories && (
          <div className="mb-2">
            <CategoryBadge category={post.blog_categories} />
          </div>
        )}
        <Link href={postUrl}>
          <CardTitle className="hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        {/* Podríamos añadir un extracto si lo tuviéramos */}
        {/* <CardDescription>Extracto del post...</CardDescription> */}
      </CardHeader>

      {/* Dejamos CardContent vacío por ahora, podríamos añadir extracto o tags aquí */}
      {/* <CardContent>
            </CardContent> */}

      <CardFooter className="mt-auto text-sm text-muted-foreground flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.published_at ?? post.created_at}>
            {format(
              new Date(post.published_at ?? post.created_at),
              "dd MMM yyyy",
              { locale: es }
            )}
          </time>
        </div>
        {post.comments_count !== undefined && (
          <Link
            href={`/noticias/${post.slug}#comentarios`}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>
              {post.comments_count} {post.comments_count === 1 ? "comentario" : "comentarios"}
            </span>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
