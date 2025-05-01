import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { CommentWithAuthor } from "@/lib/supabase/queries/comments";
import { NewCommentForm } from "@/components/news/NewCommentForm";

interface CommentSectionProps {
  comments: CommentWithAuthor[];
  postId: string; // Podría ser útil para el futuro formulario
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  return (
    <section className="mt-12 pt-8 border-t not-prose">
      {/* Aplicamos not-prose para evitar estilos de <article> */}
      <h2 className="text-2xl font-semibold mb-6">
        Comentarios ({comments.length})
      </h2>
      {comments.length === 0 ? (
        <p className="text-muted-foreground">Sé el primero en comentar.</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border rounded-lg bg-card">
              <p className="text-card-foreground mb-2">{comment.content}</p>
              <div className="text-sm text-muted-foreground flex items-center justify-between">
                <span>
                  Por: <strong>{comment.author_name ?? "Anónimo"}</strong>
                </span>
                <time dateTime={comment.created_at}>
                  {format(new Date(comment.created_at), "dd/MM/yyyy HH:mm", {
                    locale: es,
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Formulario para nuevos comentarios */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Deja tu comentario</h3>
        <NewCommentForm postId={postId} />
      </div>
    </section>
  );
}
