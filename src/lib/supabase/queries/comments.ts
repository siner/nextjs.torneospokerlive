import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/supabase";

export type CommentWithAuthor = Tables<"blog_comments"> & {
  user: Pick<Tables<'user'>, 'username' | 'avatar'> | null;
};

/**
 * Obtiene todos los comentarios para un post específico con datos del usuario,
 * ordenados por fecha de creación.
 */
export async function getCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_comments")
    .select(`
      *,
      user:user_id (
        username,
        avatar
      )
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }

  return data as CommentWithAuthor[];
}
