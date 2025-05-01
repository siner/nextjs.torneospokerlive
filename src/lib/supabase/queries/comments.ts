import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/supabase";

// TODO: Considerar añadir datos del usuario (avatar, nombre desde 'user') si se añade user_id a blog_comments
export type CommentWithAuthor = Tables<"blog_comments"> & {
  // user: Pick<Tables<'user'>, 'username' | 'avatar'> | null;
};

/**
 * Obtiene todos los comentarios para un post específico, ordenados por fecha de creación.
 * Actualmente solo obtiene los datos de la tabla blog_comments.
 */
export async function getCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_comments")
    .select("*") // Selecciona todos los campos de blog_comments
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }

  // Casteamos al tipo extendido aunque no tenga datos extra por ahora
  return data as CommentWithAuthor[];
}
