import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/supabase";

/**
 * Obtiene todas las categorías de blog ordenadas por nombre.
 */
export async function getCategories(): Promise<Tables<"blog_categories">[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

/**
 * Obtiene una categoría específica por su slug.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Tables<"blog_categories"> | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("slug", slug)
    .single(); // Esperamos un único resultado

  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }

  return data;
}
