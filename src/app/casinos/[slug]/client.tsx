"use client";

import { useState } from "react";
import RowTournament from "@/components/tournament/RowTournament";
import TournamentFilters, {
  TournamentFiltersType,
} from "@/components/filters/TournamentFilters";
import { Card, CardContent } from "@/components/ui/card";

export default function CasinoTorneosClient({
  tournaments,
  events,
  casinoName,
}: {
  tournaments: any[];
  events: any[];
  casinoName: string;
}) {
  const [filters, setFilters] = useState<TournamentFiltersType>({});

  // Filtrar eventos: solo futuros o presentes
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const availableEvents = events.filter((event: any) => {
    const eventEndDate = new Date(event.to);
    eventEndDate.setHours(0, 0, 0, 0);
    return eventEndDate >= today;
  });

  // Aplicar filtros a los torneos
  const filteredTournaments = tournaments.filter((tournament) => {
    // Filtro por buy-in mínimo
    if (filters.buyinMin !== undefined && tournament.buyin < filters.buyinMin) {
      return false;
    }

    // Filtro por buy-in máximo
    if (filters.buyinMax !== undefined && tournament.buyin > filters.buyinMax) {
      return false;
    }

    // Filtro por evento
    if (filters.eventId && tournament.event?.id !== filters.eventId) {
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
  });

  return (
    <div className="space-y-4">
      <TournamentFilters
        filters={filters}
        onFilterChange={setFilters}
        casinos={[]} // No mostramos filtro de casino porque ya estamos en uno
        events={availableEvents}
        hideCasinoFilter={true}
      />

      {filteredTournaments.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold pb-4">
            Próximos Torneos en {casinoName}
            {Object.keys(filters).length > 0 &&
              ` (${filteredTournaments.length})`}
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredTournaments.map((torneo) => (
                  <div key={"torneo-" + torneo.id}>
                    <RowTournament
                      torneo={torneo}
                      event={true}
                      casino={false}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron torneos con los filtros aplicados.
        </div>
      )}
    </div>
  );
}
