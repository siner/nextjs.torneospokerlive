"use client";

import { Star } from "lucide-react";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function EventStar({
  eventId,
  userId,
  isStarred,
}: {
  eventId: string;
  userId: string;
  isStarred: boolean;
}) {
  const [starred, setStarred] = useState(isStarred);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  const toggleStar = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      try {
        if (starred) {
          // Desmarcar
          const { error } = await supabase
            .from("event_stars")
            .delete()
            .eq("event_id", eventId)
            .eq("user_id", userId);
          if (error) throw error;
          setStarred(false);
          toast({
            description: "Evento eliminado de favoritos.",
          });
        } else {
          // Marcar
          const { error } = await supabase.from("event_stars").insert([
            {
              event_id: parseInt(eventId),
              user_id: userId,
            },
          ]);
          if (error) throw error;
          setStarred(true);
          toast({
            description: "Evento añadido a favoritos.",
          });
        }
      } catch (error: any) {
        console.error("Error toggling event star:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.message ||
            "No se pudo actualizar el estado del evento favorito.",
        });
      } finally {
        setLoading(false);
      }
    },
    [starred, eventId, userId, supabase, toast, loading]
  );

  return (
    <button
      onClick={toggleStar}
      disabled={loading}
      className={`transition-all duration-200 ${
        starred
          ? "text-yellow-500 fill-yellow-500"
          : "text-gray-400 hover:text-yellow-400 hover:fill-yellow-400"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      title={starred ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-label={starred ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <Star
        className={`h-6 w-6 drop-shadow-lg ${starred ? "fill-current" : ""}`}
      />
    </button>
  );
}
