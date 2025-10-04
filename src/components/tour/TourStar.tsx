"use client";

import { Star } from "lucide-react";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function TourStar({
  tourId,
  userId,
  isStarred,
}: {
  tourId: string;
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
            .from("tour_stars")
            .delete()
            .eq("tour_id", tourId)
            .eq("user_id", userId);
          if (error) throw error;
          setStarred(false);
          toast({
            description: "Circuito eliminado de favoritos.",
          });
        } else {
          // Marcar
          const { error } = await supabase.from("tour_stars").insert([
            {
              tour_id: parseInt(tourId),
              user_id: userId,
            },
          ]);
          if (error) throw error;
          setStarred(true);
          toast({
            description: "Circuito añadido a favoritos.",
          });
        }
      } catch (error: any) {
        console.error("Error toggling tour star:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.message ||
            "No se pudo actualizar el estado del circuito favorito.",
        });
      } finally {
        setLoading(false);
      }
    },
    [starred, tourId, userId, supabase, toast, loading]
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
