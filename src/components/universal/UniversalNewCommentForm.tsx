"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { addUniversalComment } from "@/actions/universal-comments";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { EntityType } from "@/lib/supabase/queries/universal-comments";

interface FormState {
  message: string | null;
  errors?: {
    content?: string[];
    entityType?: string[];
    entityId?: string[];
    authorName?: string[];
  };
  success?: boolean;
}

interface UniversalNewCommentFormProps {
  entityType: EntityType;
  entityId: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Enviando..." : "Enviar Comentario"}
    </Button>
  );
}

export function UniversalNewCommentForm({
  entityType,
  entityId,
}: UniversalNewCommentFormProps) {
  const initialState: FormState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(addUniversalComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingUser(false);
    };
    getUserSession();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Éxito",
        description: state.message ?? "Comentario enviado",
      });
      formRef.current?.reset();
    } else if (state.message && !state.errors) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  const isUserLoggedIn = !!user;
  const showNameField = !isUserLoggedIn && !loadingUser;

  if (loadingUser) {
    return (
      <div className="mt-6 text-sm text-muted-foreground">
        Cargando formulario...
      </div>
    );
  }

  return (
    <form ref={formRef} action={dispatch} className="mt-6 space-y-4">
      <input type="hidden" name="entityType" value={entityType} />
      <input type="hidden" name="entityId" value={entityId.toString()} />

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

