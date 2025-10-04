"use client";

import type { CommentWithAuthor } from "@/lib/supabase/queries/comments";
import { NewCommentForm } from "@/components/news/NewCommentForm";
import { Comment } from "@/components/news/Comment";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare } from "lucide-react";

interface CommentSectionProps {
  comments: CommentWithAuthor[];
  postId: string;
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id);
    });
  }, []);

  return (
    <section id="comentarios" className="mt-12 pt-8 border-t not-prose scroll-mt-20">
      {/* Header de comentarios */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">
          Comentarios ({comments.length})
        </h2>
      </div>

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">
            Sé el primero en comentar sobre esta noticia.
          </p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      {/* Formulario para nuevos comentarios */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-xl font-semibold mb-4">Deja tu comentario</h3>
        <NewCommentForm postId={postId} />
      </div>
    </section>
  );
}
