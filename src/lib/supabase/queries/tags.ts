import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/supabase";

/**
 * Obtiene todas las tags de blog ordenadas por nombre.
 */
export async function getTags(): Promise<Tables<"blog_tags">[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_tags")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return data;
}

/**
 * Obtiene un tag específico por su slug.
 */
export async function getTagBySlug(
  slug: string
): Promise<Tables<"blog_tags"> | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_tags")
    .select("*")
    .eq("slug", slug)
    .single(); // Esperamos un único resultado

  if (error) {
    console.error(`Error fetching tag with slug ${slug}:`, error);
    return null;
  }

  return data;
}
