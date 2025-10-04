"use client";

import { Star } from "lucide-react";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function TournamentStar({
  tournamentId,
  userId,
  isStarred,
}: {
  tournamentId: string;
  userId: string;
  isStarred: boolean;
}) {
  const [starred, setStarred] = useState(isStarred);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const starTournament = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (isLoading) return;

      setIsLoading(true);
      try {
        if (starred) {
          await supabase
            .from("tournament_stars")
            .delete()
            .eq("tournament_id", tournamentId)
            .eq("user_id", userId);
        } else {
          await supabase.from("tournament_stars").insert([
            {
              tournament_id: tournamentId,
              user_id: userId,
            },
          ]);
        }
        setStarred(!starred);
      } catch (error) {
        console.error("Error starring tournament", error);
      } finally {
        setIsLoading(false);
      }
    },
    [starred, tournamentId, userId, supabase, isLoading]
  );

  return (
    <button
      onClick={(e) => starTournament(e)}
      disabled={isLoading}
      className={`transition-all duration-200 ${
        starred
          ? "text-yellow-500 fill-yellow-500"
          : "text-gray-400 hover:text-yellow-400 hover:fill-yellow-400"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      title={starred ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-label={starred ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <Star
        className={`h-6 w-6 drop-shadow-lg ${starred ? "fill-current" : ""}`}
      />
    </button>
  );
}
