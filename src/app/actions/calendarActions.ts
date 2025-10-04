"use server";

import { getTournamentsForMonth, getEventsForMonth } from "@/lib/api";
import { Database } from "@/types/supabase";

// Actualizar los tipos aquí para que coincidan con la API (incluyendo datos relacionados)
type Casino = Database["public"]["Tables"]["Casino"]["Row"];
type Tour = Database["public"]["Tables"]["Tour"]["Row"];
type BaseEvent = Database["public"]["Tables"]["Event"]["Row"];
type BaseTournament = Database["public"]["Tables"]["Tournament"]["Row"];

interface EventWithRelations extends BaseEvent {
  Casino: Casino | null;
  Tour: Tour | null;
}

interface TournamentWithRelations extends BaseTournament {
  Casino: Casino | null;
  Event: (BaseEvent & { Tour: Tour | null }) | null;
}

type TournamentActionResponse = TournamentWithRelations[];
type EventActionResponse = EventWithRelations[];

// Actualizar interfaz de filtros para aceptar starredCasinoIds y starredTournamentIds
interface FetchFilters {
  casinoId?: number;
  eventId?: number;
  starredCasinoIds?: number[];
  starredTournamentIds?: number[];
}

/**
 * Server Action para obtener torneos de un mes.
 */
export async function fetchTournamentsForMonthAction(
  year: number,
  month: number,
  filters?: FetchFilters
): Promise<TournamentActionResponse> {
  // Usar el tipo de respuesta preciso
  try {
    // Pasamos los filtros (incluyendo starredCasinoIds si existen) a la función API
    const tournaments = await getTournamentsForMonth(year, month, filters);
    return tournaments as TournamentActionResponse; // Castear al tipo esperado
  } catch (error) {
    console.error(
      "Server Action Error (fetchTournamentsForMonthAction):",
      error
    );
    // Podríamos retornar un objeto de error estandarizado si quisiéramos
    // Por ahora, propagamos el error o devolvemos array vacío
    // return { error: "Failed to fetch tournaments" };
    return [];
  }
}

/**
 * Server Action para obtener eventos de un mes.
 */
export async function fetchEventsForMonthAction(
  year: number,
  month: number,
  filters?: FetchFilters
): Promise<EventActionResponse> {
  // Usar el tipo de respuesta preciso
  // Solo obtener eventos si no estamos filtrando por un eventId específico
  // (la lógica de filtrado ya está en el componente cliente, pero
  // mantenemos la comprobación aquí para evitar llamadas innecesarias)
  if (filters?.eventId) {
    return [];
  }
  try {
    // Pasamos los filtros a la función API
    const events = await getEventsForMonth(year, month, filters);
    return events as EventActionResponse; // Castear al tipo esperado
  } catch (error) {
    console.error("Server Action Error (fetchEventsForMonthAction):", error);
    return [];
    // return { error: "Failed to fetch events" };
  }
}
