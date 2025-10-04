"use client";

import { useState } from "react";
import RowTournament from "@/components/tournament/RowTournament";
import TournamentFilters, {
  TournamentFiltersType,
} from "@/components/filters/TournamentFilters";

export default function TorneosClient({
  tournaments,
}: {
  tournaments: any[];
}) {
  const [filters, setFilters] = useState<TournamentFiltersType>({});

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

    // Filtro por tipo
    if (filters.type && tournament.type !== filters.type) {
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

    // Filtro por garantizado
    if (filters.guaranteed && (!tournament.guaranteed || tournament.guaranteed === 0)) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <TournamentFilters onFiltersChange={setFilters} />

      <div className="space-y-0.5">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((torneo: any) => (
            <RowTournament
              key={"torneo-filtered-" + torneo.id}
              torneo={torneo}
              casino="true"
              event="true"
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No se encontraron torneos</p>
            <p className="text-sm">
              Prueba a ajustar los filtros para ver más resultados
            </p>
          </div>
        )}
      </div>

      {filteredTournaments.length > 0 && (
        <div className="text-sm text-muted-foreground text-center py-4">
          Mostrando {filteredTournaments.length} de {tournaments.length} torneos
        </div>
      )}
    </div>
  );
}

