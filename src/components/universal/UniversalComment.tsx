"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Edit2, Trash2, X, Check } from "lucide-react";
import {
  updateUniversalComment,
  deleteUniversalComment,
} from "@/actions/universal-comments";
import type {
  UniversalCommentWithAuthor,
  EntityType,
} from "@/lib/supabase/queries/universal-comments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UniversalCommentProps {
  comment: UniversalCommentWithAuthor;
  currentUserId?: string;
}

export function UniversalComment({ comment, currentUserId }: UniversalCommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const isOwner = currentUserId === comment.user_id;
  const authorName = comment.user?.username || comment.author_name || "Anónimo";
  const avatar = comment.user?.avatar;
  const isEdited = comment.updated_at !== comment.created_at;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === comment.content.trim()) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      const result = await updateUniversalComment(
        comment.id,
        editedContent,
        comment.entity_type
      );

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUniversalComment(
        comment.id,
        comment.entity_type
      );

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={avatar || undefined} alt={authorName} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {authorName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-grow min-w-0">
          {/* Header con nombre y fecha */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{authorName}</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={comment.created_at}>
                  {format(new Date(comment.created_at), "dd MMM yyyy, HH:mm", {
                    locale: es,
                  })}
                </time>
                {isEdited && (
                  <span className="text-xs text-muted-foreground italic">
                    (editado)
                  </span>
                )}
              </div>
            </div>

            {/* Botones de acción (solo para el propietario) */}
            {isOwner && !isEditing && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleEdit}
                  disabled={isPending}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar comentario?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. El comentario será eliminado
                        permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* Contenido del comentario */}
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[80px]"
                disabled={isPending}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isPending || editedContent.trim().length < 3}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelEdit}
                  disabled={isPending}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-card-foreground whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

