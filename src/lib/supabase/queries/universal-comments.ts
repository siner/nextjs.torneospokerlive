import { createClient } from "@/lib/supabase/server";
import type { Tables, Database } from "@/types/supabase";

export type EntityType = Database["public"]["Enums"]["entity_type"];

export type UniversalCommentWithAuthor = Tables<"comments"> & {
  user: Pick<Tables<'user'>, 'username' | 'avatar'> | null;
};

/**
 * Obtiene todos los comentarios para una entidad específica con datos del usuario,
 * ordenados por fecha de creación.
 */
export async function getCommentsByEntity(
  entityType: EntityType,
  entityId: number
): Promise<UniversalCommentWithAuthor[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:user_id (
        username,
        avatar
      )
    `)
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching comments for ${entityType} ${entityId}:`, error);
    return [];
  }

  return data as UniversalCommentWithAuthor[];
}

/**
 * Obtiene el conteo de comentarios para una entidad específica
 */
export async function getCommentsCountByEntity(
  entityType: EntityType,
  entityId: number
): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("entity_type", entityType)
    .eq("entity_id", entityId);

  if (error) {
    console.error(`Error counting comments for ${entityType} ${entityId}:`, error);
    return 0;
  }

  return count || 0;
}

