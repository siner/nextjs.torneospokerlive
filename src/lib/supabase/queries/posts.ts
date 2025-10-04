import { createClient } from "@/lib/supabase/server";
import type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/supabase"; // Importar tipos generados

// Definir un tipo más específico para los posts con datos relacionados
// Combina el tipo base 'blog_posts' con los campos seleccionados de 'blog_categories'
export type PostWithAuthorAndCategory = Tables<"blog_posts"> & {
  blog_categories: Pick<Tables<"blog_categories">, "name" | "slug"> | null; // La categoría es nullable
  comments_count?: number; // Conteo de comentarios
};

// Tipo similar para el post individual que incluirá tags en el futuro
export type PostWithAuthorCategoryAndTags = PostWithAuthorAndCategory & {
  tags: Pick<Tables<"blog_tags">, "name" | "slug">[];
};

// Tipo para el resultado de getPosts, incluyendo paginación
export type PaginatedPostsResponse = {
  posts: PostWithAuthorAndCategory[];
  totalCount: number;
};

export const POSTS_PER_PAGE = 10; // Define cuántos posts mostrar por página

/**
 * Obtiene una lista paginada de posts publicados.
 * Incluye información de la categoría.
 * Permite filtrar por slug de categoría o de tag.
 * Devuelve los posts de la página solicitada y el conteo total.
 */
export async function getPosts({
  categorySlug,
  tagSlug,
  page = 1, // Página actual, por defecto 1
}: {
  categorySlug?: string;
  tagSlug?: string;
  page?: number;
} = {}): Promise<PaginatedPostsResponse> {
  const supabase = createClient();

  // Calcular el rango para la paginación
  const limit = POSTS_PER_PAGE;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let postIdsFromTag: string[] | null = null;
  let categoryIdFilter: string | null = null;

  // 1. Obtener ID de categoría si se filtra por slug
  if (categorySlug) {
    const { data: catData, error: catError } = await supabase
      .from("blog_categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (catError || !catData) {
      console.error(
        `Error finding category with slug ${categorySlug}:`,
        catError
      );
      return { posts: [], totalCount: 0 };
    }
    categoryIdFilter = catData.id;
  }

  // 2. Si hay filtro de tag, obtener los IDs de los posts correspondientes
  if (tagSlug) {
    const { data: tagData, error: tagError } = await supabase
      .from("blog_tags")
      .select("id")
      .eq("slug", tagSlug)
      .single();

    if (tagError || !tagData) {
      console.error(`Error finding tag with slug ${tagSlug}:`, tagError);
      return { posts: [], totalCount: 0 }; // Si el tag no existe, no hay posts que mostrar
    }

    const { data: postTagsData, error: postTagsError } = await supabase
      .from("blog_post_tags")
      .select("post_id")
      .eq("tag_id", tagData.id);

    if (postTagsError) {
      console.error(`Error fetching posts for tag ${tagSlug}:`, postTagsError);
      return { posts: [], totalCount: 0 };
    }
    postIdsFromTag = postTagsData.map((pt) => pt.post_id);
    if (postIdsFromTag.length === 0) {
      return { posts: [], totalCount: 0 }; // No hay posts con este tag
    }
  }

  // 3. Construir objeto de filtros
  const filters: { status: string; category_id?: string; id?: string[] } = {
    status: "published",
  };
  if (categoryIdFilter) {
    filters.category_id = categoryIdFilter;
  }
  // Nota: .match no soporta 'in', así que el filtro de tag se aplica después si es necesario
  // TODO: Revisar si hay una forma mejor de combinar .match y .in si ambos filtros están activos

  // 4. Ejecutar consulta para obtener el conteo total (usando match)
  const countQueryBuilder = supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .match(filters);

  // Aplicar filtro IN para tags si es necesario (no se puede con match)
  if (postIdsFromTag) {
    countQueryBuilder.in("id", postIdsFromTag);
  }

  const { count, error: countError } = await countQueryBuilder;

  if (countError) {
    console.error("Error fetching posts count:", countError);
    return { posts: [], totalCount: 0 };
  }

  // Si no hay posts, retornar temprano
  if (count === 0) {
    return { posts: [], totalCount: 0 };
  }

  // 5. Ejecutar consulta para obtener los datos de la página actual (usando match)
  const dataQueryBuilder = supabase
    .from("blog_posts")
    .select(`
      *,
      blog_categories:category_id ( name, slug ),
      blog_comments ( count )
    `)
    .match(filters)
    .order("published_at", { ascending: false })
    .range(from, to);

  // Aplicar filtro IN para tags si es necesario
  if (postIdsFromTag) {
    dataQueryBuilder.in("id", postIdsFromTag);
  }

  const { data, error: dataError } = await dataQueryBuilder;

  if (dataError) {
    console.error("Error fetching posts data:", dataError);
    return { posts: [], totalCount: count ?? 0 }; // Devolver conteo aunque fallen los datos?
  }

  return {
    posts: data as PostWithAuthorAndCategory[],
    totalCount: count ?? 0,
  };
}

/**
 * Obtiene un post específico por su slug.
 * Incluye información del autor, categoría.
 * TODO: Añadir la obtención de tags relacionados desde blog_post_tags.
 */
export async function getPostBySlug(
  slug: string
): Promise<PostWithAuthorCategoryAndTags | null> {
  const supabase = createClient();

  const { data: postData, error: postError } = await supabase
    .from("blog_posts")
    .select(
      `
			*,
			blog_categories:category_id ( name, slug )
		`
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (postError || !postData) {
    console.error(`Error fetching post with slug ${slug}:`, postError);
    return null;
  }

  // Obtener los tags asociados al post
  const { data: tagsData, error: tagsError } = await supabase
    .from("blog_post_tags")
    .select(
      `
      tag:blog_tags ( name, slug )
    `
    )
    .eq("post_id", postData.id);

  if (tagsError) {
    console.error(`Error fetching tags for post ${postData.id}:`, tagsError);
    // No bloqueamos la carga del post si fallan los tags, devolvemos tags vacíos
  }

  // Extraemos los datos de los tags directamente de la respuesta
  // Supabase devuelve un array de objetos { tag: { name, slug } | null }
  const tags = tagsData?.map((item) => item.tag).filter(Boolean) ?? [];

  // Combinar datos del post y tags
  return {
    ...postData,
    tags: tags, // Usar los tags obtenidos
  } as PostWithAuthorCategoryAndTags;
}

/**
 * Obtiene los 'limit' posts publicados más recientes.
 * Incluye información de la categoría.
 */
export async function getLatestPosts(
  limit: number = 3 // Por defecto, 3 posts
): Promise<PostWithAuthorAndCategory[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_categories:category_id ( name, slug ),
      blog_comments ( count )
    `) // Seleccionar lo necesario para PostCard incluyendo conteo de comentarios
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest posts:", error);
    return []; // Devolver array vacío en caso de error
  }

  return data as PostWithAuthorAndCategory[];
}

// TODO: Añadir funciones getCategories, getTags, getCommentsByPostId
// TODO: Considerar crear funciones separadas para crear/actualizar posts si es necesario desde el servidor.
