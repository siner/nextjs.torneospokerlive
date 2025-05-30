"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Tipo para el estado devuelto por la action, compatible con el FormState del cliente
interface ActionResponseState {
  message: string | null;
  errors?: {
    content?: string[];
    postId?: string[];
    authorName?: string[];
  };
  success?: boolean;
}

// Esquema de validación para los datos del comentario
const CommentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "El comentario debe tener al menos 3 caracteres." })
    .max(1000, {
      message: "El comentario no puede exceder los 1000 caracteres.",
    }),
  postId: z.string().uuid({ message: "ID de post inválido." }),
  // El nombre solo es requerido si el usuario no está logueado
  // Permitir null explícitamente y luego hacerlo opcional
  authorName: z.string().nullable().optional(),
});

export async function addComment(
  prevState: any,
  formData: FormData
): Promise<ActionResponseState> {
  const supabase = createClient();

  // 1. Obtener datos del usuario (si está logueado)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Validar datos del formulario usando Zod
  const validatedFields = CommentSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
    authorName: formData.get("authorName"),
  });

  // Si la validación falla, devolver errores
  if (!validatedFields.success) {
    console.error(
      "Validation Errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validación.",
      success: false,
    };
  }

  const { content, postId, authorName } = validatedFields.data;

  // 3. Si el usuario no está logueado, el nombre es obligatorio
  if (!user && (!authorName || authorName.trim().length === 0)) {
    return {
      errors: {
        authorName: ["Se requiere un nombre para comentar como invitado."],
      },
      message: "Falta el nombre del autor.",
      success: false,
    };
  }

  // 4. Preparar datos para insertar
  const commentData = {
    post_id: postId,
    content: content,
    user_id: user ? user.id : null, // ID del usuario si está logueado
    author_name: user ? null : authorName, // Nombre si es anónimo
  };

  // 5. Insertar comentario en Supabase
  const { error } = await supabase.from("blog_comments").insert(commentData);

  // 6. Manejar error de inserción
  if (error) {
    console.error("Supabase Insert Error:", error);
    return {
      message: `Error al guardar el comentario: ${error.message}`,
      success: false,
    };
  }

  // 7. Revalidar la ruta del post para mostrar el nuevo comentario
  // Es importante obtener el slug del post si solo tenemos el ID aquí.
  // Por ahora, asumimos que la revalidación por layout funciona, o necesitamos el slug.
  // Alternativa: revalidar toda la sección de noticias
  revalidatePath("/noticias", "layout"); // Revalida todo bajo /noticias
  // O si tuviéramos el slug:
  // const postSlug = await getPostSlugById(postId); // Necesitaríamos esta función auxiliar
  // if (postSlug) revalidatePath(`/noticias/${postSlug}`);

  console.log("Comment added successfully!");
  // 8. Devolver éxito
  return {
    message: "Comentario añadido con éxito.",
    success: true,
    errors: {},
  };
}
