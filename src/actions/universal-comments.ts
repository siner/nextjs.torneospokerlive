"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { EntityType } from "@/lib/supabase/queries/universal-comments";

// Tipo para el estado devuelto por la action
interface ActionResponseState {
  message: string | null;
  errors?: {
    content?: string[];
    entityType?: string[];
    entityId?: string[];
    authorName?: string[];
  };
  success?: boolean;
}

// Esquema de validación para los datos del comentario
const CommentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "El comentario debe tener al menos 3 caracteres." })
    .max(2000, {
      message: "El comentario no puede exceder los 2000 caracteres.",
    }),
  entityType: z.enum(["tournament", "casino", "event", "tour"], {
    message: "Tipo de entidad inválido.",
  }),
  entityId: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "ID de entidad inválido.",
  }),
  authorName: z.string().nullable().optional(),
});

/**
 * Action para añadir un comentario a cualquier entidad
 */
export async function addUniversalComment(
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
    entityType: formData.get("entityType"),
    entityId: formData.get("entityId"),
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

  const { content, entityType, entityId, authorName } = validatedFields.data;

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
    entity_type: entityType as EntityType,
    entity_id: parseInt(entityId),
    content: content,
    user_id: user ? user.id : null,
    author_name: user ? null : authorName,
  };

  // 5. Insertar comentario en Supabase
  const { error } = await supabase.from("comments").insert(commentData);

  // 6. Manejar error de inserción
  if (error) {
    console.error("Supabase Insert Error:", error);
    return {
      message: `Error al guardar el comentario: ${error.message}`,
      success: false,
    };
  }

  // 7. Revalidar la ruta correspondiente
  const pathMap: Record<EntityType, string> = {
    tournament: "/torneos",
    casino: "/casinos",
    event: "/eventos",
    tour: "/circuitos",
  };
  
  revalidatePath(pathMap[entityType as EntityType], "layout");

  console.log("Comment added successfully!");
  
  // 8. Devolver éxito
  return {
    message: "Comentario añadido con éxito.",
    success: true,
    errors: {},
  };
}

/**
 * Action para actualizar un comentario existente
 */
export async function updateUniversalComment(
  commentId: string,
  content: string,
  entityType: EntityType
): Promise<{ success: boolean; message: string }> {
  const supabase = createClient();

  // 1. Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Debes estar autenticado para editar comentarios.",
    };
  }

  // 2. Validar contenido
  if (!content || content.trim().length < 3) {
    return {
      success: false,
      message: "El comentario debe tener al menos 3 caracteres.",
    };
  }

  if (content.length > 2000) {
    return {
      success: false,
      message: "El comentario no puede exceder los 2000 caracteres.",
    };
  }

  // 3. Actualizar comentario (RLS verifica que sea el propietario)
  const { error } = await supabase
    .from("comments")
    .update({ content: content.trim() })
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating comment:", error);
    return {
      success: false,
      message: `Error al actualizar el comentario: ${error.message}`,
    };
  }

  // 4. Revalidar
  const pathMap: Record<EntityType, string> = {
    tournament: "/torneos",
    casino: "/casinos",
    event: "/eventos",
    tour: "/circuitos",
  };
  
  revalidatePath(pathMap[entityType], "layout");

  return {
    success: true,
    message: "Comentario actualizado con éxito.",
  };
}

/**
 * Action para eliminar un comentario
 */
export async function deleteUniversalComment(
  commentId: string,
  entityType: EntityType
): Promise<{ success: boolean; message: string }> {
  const supabase = createClient();

  // 1. Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Debes estar autenticado para eliminar comentarios.",
    };
  }

  // 2. Eliminar comentario (RLS verifica que sea el propietario)
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: `Error al eliminar el comentario: ${error.message}`,
    };
  }

  // 3. Revalidar
  const pathMap: Record<EntityType, string> = {
    tournament: "/torneos",
    casino: "/casinos",
    event: "/eventos",
    tour: "/circuitos",
  };
  
  revalidatePath(pathMap[entityType], "layout");

  return {
    success: true,
    message: "Comentario eliminado con éxito.",
  };
}

