"use client";

import { useState } from "react";
import RowTournament from "@/components/tournament/RowTournament";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MisTorneosClient({
  tournaments,
}: {
  tournaments: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.casino.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingTournaments = filteredTournaments.filter((t) => {
    const tournamentDate = new Date(t.date);
    tournamentDate.setHours(0, 0, 0, 0);
    return tournamentDate >= today;
  });

  const pastTournaments = filteredTournaments.filter((t) => {
    const tournamentDate = new Date(t.date);
    tournamentDate.setHours(0, 0, 0, 0);
    return tournamentDate < today;
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar torneo o casino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="proximos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="proximos">
            Próximos ({upcomingTournaments.length})
          </TabsTrigger>
          <TabsTrigger value="pasados">
            Pasados ({pastTournaments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proximos" className="mt-4">
          {upcomingTournaments.length > 0 ? (
            <div className="border rounded-md">
              {upcomingTournaments.map((tournament) => (
                <RowTournament
                  key={tournament.id}
                  torneo={tournament}
                  casino="true"
                  event="true"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? `No se encontraron próximos torneos con "${searchTerm}"`
                : "No tienes próximos torneos favoritos"}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pasados" className="mt-4">
          {pastTournaments.length > 0 ? (
            <div className="border rounded-md opacity-60">
              {pastTournaments.map((tournament) => (
                <RowTournament
                  key={tournament.id}
                  torneo={tournament}
                  casino="true"
                  event="true"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? `No se encontraron torneos pasados con "${searchTerm}"`
                : "No tienes torneos pasados en favoritos"}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
