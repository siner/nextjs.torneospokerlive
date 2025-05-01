"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { addComment } from "@/actions/blog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // Para notificaciones
// Importar cliente Supabase para el navegador
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// Tipo para el estado manejado por useFormState
interface FormState {
  message: string | null;
  errors?: {
    content?: string[];
    postId?: string[];
    authorName?: string[];
  };
  success?: boolean;
}

interface NewCommentFormProps {
  postId: string;
  // // Pasamos el estado de sesión como prop o lo obtenemos aquí
  // isUserLoggedIn: boolean;
}

// Componente para el botón de envío, muestra estado pendiente
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Enviando..." : "Enviar Comentario"}
    </Button>
  );
}

export function NewCommentForm({ postId }: NewCommentFormProps) {
  // Estado inicial compatible con FormState
  const initialState: FormState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(addComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  // Estado local para el usuario
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Obtener la sesión del usuario en el cliente
  useEffect(() => {
    const supabase = createClient(); // Cliente del navegador
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingUser(false);
    };
    getUserSession();
  }, []);

  // Resetear formulario y mostrar toast al tener éxito o error general
  useEffect(() => {
    if (state.success) {
      toast({
        title: "Éxito",
        description: state.message ?? "Comentario enviado", // Asegurar string
      });
      formRef.current?.reset();
    } else if (state.message && !state.errors) {
      // Error general
      toast({
        title: "Error",
        description: state.message, // message ya es string o null
        variant: "destructive",
      });
    }
  }, [state, toast]);

  // Determinar si mostrar el campo de nombre
  const isUserLoggedIn = !!user;
  const showNameField = !isUserLoggedIn && !loadingUser; // Mostrar solo si no logueado Y no cargando

  if (loadingUser) {
    // Podríamos mostrar un loader simple mientras se carga la sesión
    return (
      <div className="mt-6 text-sm text-muted-foreground">
        Cargando formulario...
      </div>
    );
  }

  return (
    <form ref={formRef} action={dispatch} className="mt-6 space-y-4">
      <input type="hidden" name="postId" value={postId} />

      {/* Campo de Nombre (solo para invitados) */}
      {showNameField && (
        <div className="space-y-2">
          <Label htmlFor="authorName">Nombre</Label>
          <Input
            id="authorName"
            name="authorName"
            required
            placeholder="Tu nombre (requerido si no estás logueado)"
            aria-describedby="authorName-error"
          />
          <div id="authorName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.authorName && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.authorName[0]}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Campo de Comentario */}
      <div className="space-y-2">
        <Label htmlFor="content">Tu Comentario</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Escribe tu comentario aquí..."
          required
          rows={4}
          aria-describedby="content-error"
        />
        <div id="content-error" aria-live="polite" aria-atomic="true">
          {state.errors?.content && (
            <p className="text-sm font-medium text-destructive">
              {state.errors.content[0]}
            </p>
          )}
        </div>
      </div>

      <SubmitButton />

      {/* Mensaje general de error (no relacionado a un campo específico) */}
      <div aria-live="polite" aria-atomic="true">
        {state.message && !state.success && !state.errors && (
          <p className="text-sm font-medium text-destructive mt-2">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
