"use client";

import { useState } from "react";
import RowTournament from "@/components/tournament/RowTournament";
import TournamentFilters, {
  TournamentFiltersType,
} from "@/components/filters/TournamentFilters";
import { Card } from "@/components/ui/card";

export default function EventoTorneosClient({
  tournamentsByDate,
  casinos,
  eventName,
}: {
  tournamentsByDate: { date: string; tournaments: any[] }[];
  casinos: any[];
  eventName: string;
}) {
  const [filters, setFilters] = useState<TournamentFiltersType>({});

  // Obtener lista plana de todos los torneos
  const allTournaments = tournamentsByDate.flatMap((day) => day.tournaments);

  // Filtrar casinos: solo los que tienen torneos en el listado actual
  const casinoIdsInTournaments = new Set(
    allTournaments.map((t) => t.casino?.id).filter(Boolean)
  );
  const availableCasinos = casinos.filter((casino: any) =>
    casinoIdsInTournaments.has(casino.id)
  );

  // Aplicar filtros a cada día
  const filteredTournamentsByDate = tournamentsByDate
    .map((day) => ({
      date: day.date,
      tournaments: day.tournaments.filter((tournament) => {
        // Filtro por buy-in mínimo
        if (
          filters.buyinMin !== undefined &&
          tournament.buyin < filters.buyinMin
        ) {
          return false;
        }

        // Filtro por buy-in máximo
        if (
          filters.buyinMax !== undefined &&
          tournament.buyin > filters.buyinMax
        ) {
          return false;
        }

        // Filtro por casino
        if (filters.casinoId && tournament.casino?.id !== filters.casinoId) {
          return false;
        }

        // Filtro por fecha desde
        if (filters.dateFrom) {
          const tournamentDate = new Date(tournament.date);
          const filterDate = new Date(filters.dateFrom);
          filterDate.setHours(0, 0, 0, 0);
          tournamentDate.setHours(0, 0, 0, 0);
          if (tournamentDate < filterDate) {
            return false;
          }
        }

        // Filtro por fecha hasta
        if (filters.dateTo) {
          const tournamentDate = new Date(tournament.date);
          const filterDate = new Date(filters.dateTo);
          filterDate.setHours(23, 59, 59, 999);
          if (tournamentDate > filterDate) {
            return false;
          }
        }

        return true;
      }),
    }))
    .filter((day) => day.tournaments.length > 0);

  const totalFiltered = filteredTournamentsByDate.reduce(
    (acc, day) => acc + day.tournaments.length,
    0
  );

  return (
    <div className="space-y-4">
      <TournamentFilters
        filters={filters}
        onFilterChange={setFilters}
        casinos={availableCasinos}
        events={[]} // No mostramos filtro de evento porque ya estamos en uno
        hideEventFilter={true}
      />

      {filteredTournamentsByDate.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Programa de Torneos de {eventName}
            {Object.keys(filters).length > 0 && ` (${totalFiltered})`}
          </h2>
          {filteredTournamentsByDate.map((day) => (
            <div key={day.date}>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {day.date}
              </h3>
              <Card>
                <div className="space-y-0">
                  {day.tournaments.map((tournament: any) => (
                    <RowTournament
                      key={"tournament-" + tournament.id}
                      torneo={tournament}
                      event={false}
                      casino={false}
                      hideDate={false}
                    />
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron torneos con los filtros aplicados.
        </div>
      )}
    </div>
  );
}
