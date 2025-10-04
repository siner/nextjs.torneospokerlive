import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { Database } from "@/types/supabase";
import { startOfMonth, endOfMonth, formatISO } from "date-fns";

export async function getAllTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casinoId, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getSearchTournaments(
  search: string | string[] | undefined
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .ilike("name", `%${search}%`)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getSearchEvents(search: string | string[] | undefined) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .ilike("name", `%${search}%`)
    .not("draft", "is", true)
    .order("from", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getSearchCasinos(search: string | string[] | undefined) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Casino")
    .select("*")
    .ilike("name", `%${search}%`);
  if (error) throw error;
  return data;
}

export async function getSearchTours(search: string | string[] | undefined) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tour")
    .select("*")
    .ilike("name", `%${search}%`);
  if (error) throw error;
  return data;
}

export async function getTodayTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq("date", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTomorrowTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq(
      "date",
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    )
    .not("draft", "is", true)
    .order("date", { ascending: false })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getNextTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select(
      "*, casino:Casino(*), event:Event(*, casino:Casino(*), tour:Tour(*))"
    )
    .not("draft", "is", true)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getMyCasinosNextTournaments(userId: string) {
  const supabase = createClient();
  const { data: casinos, error: casinos_error } = await supabase
    .from("casino_stars")
    .select("casino_id")
    .eq("user_id", userId);

  const { data, error } = await supabase
    .from("Tournament")
    .select(
      "*, casino:Casino(*), event:Event(*, casino:Casino(*), tour:Tour(*))"
    )
    .in("casinoId", casinos?.map((c: any) => c.casino_id) || [])
    .gte("date", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTournament(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select(
      "*, casino:Casino(*), event:Event(*, casino:Casino(*), tour:Tour(*))"
    )
    .eq("slug", slug)
    .not("draft", "is", true);
  if (error) throw error;
  return data[0];
}

export async function getTournamentById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select(
      "*, casino:Casino(*), event:Event(*, casino:Casino(*), tour:Tour(*))"
    )
    .eq("id", id);
  if (error) throw error;
  return data[0];
}

export async function getAllCasinos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Casino")
    .select("*, casino_stars(*)")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getCasino(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Casino")
    .select("*, casino_stars(*)")
    .eq("slug", slug);
  if (error) throw error;

  return data[0];
}

export async function getCasinoById(casinoId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Casino")
    .select("*")
    .eq("id", casinoId);
  if (error) throw error;
  return data[0];
}

export async function getEventsByCasino(casinoId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .eq("casinoId", casinoId)
    .not("draft", "is", true);
  if (error) throw error;
  return data;
}

export async function getNextTorneosByCasino(casinoId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq("casinoId", casinoId)
    .gte("date", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getAllTours() {
  const supabase = createClient();
  const { data, error } = await supabase.from("Tour").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function getTour(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tour")
    .select("*")
    .eq("slug", slug);
  if (error) throw error;
  return data[0];
}

export async function getTourById(tourId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tour")
    .select("*")
    .eq("id", tourId);
  if (error) throw error;
  return data[0];
}

export async function getEventsByTour(tourId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .not("draft", "is", true)
    .eq("tourId", tourId);
  if (error) throw error;
  return data;
}

export async function getNextEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .gt("from", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: true });
  if (error) {
    console.error("Error fetching next events:", error);
    return [];
  }
  return data || [];
}

export async function getCurrentEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .gte("to", new Date().toISOString().split("T")[0])
    .lte("from", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getMyCasinosCurrentEvents(userId: string) {
  const supabase = createClient();
  const { data: casinos, error: casinos_error } = await supabase
    .from("casino_stars")
    .select("casino_id")
    .eq("user_id", userId);

  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .in("casinoId", casinos?.map((c: any) => c.casino_id) || [])
    .gte("to", new Date().toISOString().split("T")[0])
    .lte("from", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getMyCasinosNextEvents(userId: string) {
  const supabase = createClient();
  const { data: casinos, error: casinos_error } = await supabase
    .from("casino_stars")
    .select("casino_id")
    .eq("user_id", userId);

  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .in("casinoId", casinos?.map((c: any) => c.casino_id) || [])
    .gte("from", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTournamentsByEvent(eventId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq("eventId", eventId)
    .not("draft", "is", true)
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getPastEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .lte("to", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getEvent(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, tour:Tour(*), casino:Casino(*)")
    .eq("slug", slug)
    .not("draft", "is", true);
  if (error) throw error;
  return data[0];
}

export async function getEventById(eventId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, tour:Tour(*), casino:Casino(*)")
    .eq("id", eventId);
  if (error) throw error;
  return data[0];
}

export async function getAllEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, tour:Tour(*), casino:Casino(*)")
    .not("draft", "is", true)
    .order("from", { ascending: false });
  if (error) throw error;
  return data;
}

// Perfil

export async function getProfile(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").select("*").eq("id", id);
  if (error) throw error;
  return data[0];
}

export async function getStarredCasinos(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("casino_stars")
    .select("casino:Casino(*)")
    .eq("user_id", id);
  if (error) throw error;

  // Filtrar duplicados por casino_id
  const casinos = data.map((d: any) => d.casino);
  const uniqueCasinos = Array.from(
    new Map(casinos.map((casino: any) => [casino.id, casino])).values()
  );

  return uniqueCasinos;
}

/**
 * Obtiene solo los IDs de los casinos favoritos de un usuario.
 */
export async function getStarredCasinoIds(userId: string): Promise<number[]> {
  noStore(); // Asegurar que no se cachea si los favoritos cambian
  const supabase = createClient();
  const { data, error } = await supabase
    .from("casino_stars")
    .select("casino_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred casino IDs:", error);
    return [];
  }
  // Asegurarse de que casino_id no es null y devolver array de números
  return (
    data?.map((c) => c.casino_id).filter((id): id is number => id !== null) ||
    []
  );
}

/**
 * Obtiene los torneos favoritos de un usuario con toda la información relacionada.
 */
export async function getStarredTournaments(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tournament_stars")
    .select(
      `
      tournament:Tournament(
        *,
        casino:Casino(*),
        event:Event(
          *,
          tour:Tour(*)
        )
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred tournaments:", error);
    return [];
  }

  const tournaments = data?.map((d: any) => d.tournament) || [];

  // Filtrar duplicados por tournament_id
  const uniqueTournaments = Array.from(
    new Map(tournaments.map((t: any) => [t.id, t])).values()
  );

  return uniqueTournaments;
}

/**
 * Obtiene solo los IDs de los torneos favoritos de un usuario.
 */
export async function getStarredTournamentIds(
  userId: string
): Promise<number[]> {
  noStore(); // Asegurar que no se cachea si los favoritos cambian
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tournament_stars")
    .select("tournament_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred tournament IDs:", error);
    return [];
  }
  return (
    data
      ?.map((t) => t.tournament_id)
      .filter((id): id is number => id !== null) || []
  );
}

/**
 * Obtiene los eventos favoritos de un usuario con toda la información relacionada.
 */
export async function getStarredEvents(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("event_stars")
    .select(
      `
      event:Event(
        *,
        casino:Casino(*),
        tour:Tour(*)
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred events:", error);
    return [];
  }

  const events = data?.map((d: any) => d.event) || [];

  // Filtrar duplicados por event_id
  const uniqueEvents = Array.from(
    new Map(events.map((e: any) => [e.id, e])).values()
  );

  return uniqueEvents;
}

/**
 * Obtiene solo los IDs de los eventos favoritos de un usuario.
 */
export async function getStarredEventIds(userId: string): Promise<number[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("event_stars")
    .select("event_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred event IDs:", error);
    return [];
  }

  return (
    data?.map((e) => e.event_id).filter((id): id is number => id !== null) || []
  );
}

/**
 * Obtiene los circuitos (tours) favoritos de un usuario.
 */
export async function getStarredTours(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tour_stars")
    .select("tour:Tour(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred tours:", error);
    return [];
  }

  const tours = data?.map((d: any) => d.tour) || [];

  // Filtrar duplicados por tour_id
  const uniqueTours = Array.from(
    new Map(tours.map((t: any) => [t.id, t])).values()
  );

  return uniqueTours;
}

/**
 * Obtiene solo los IDs de los circuitos favoritos de un usuario.
 */
export async function getStarredTourIds(userId: string): Promise<number[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tour_stars")
    .select("tour_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching starred tour IDs:", error);
    return [];
  }

  return (
    data?.map((t) => t.tour_id).filter((id): id is number => id !== null) || []
  );
}

/**
 * Obtiene los próximos torneos favoritos de un usuario.
 */
export async function getMyStarredNextTournaments(userId: string) {
  const supabase = createClient();

  // Primero obtener los IDs de torneos favoritos
  const tournamentIds = await getStarredTournamentIds(userId);

  if (tournamentIds.length === 0) {
    return [];
  }

  // Obtener los torneos con toda la información
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .in("id", tournamentIds)
    .gte("date", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    console.error("Error fetching my starred tournaments:", error);
    return [];
  }
  return data || [];
}

// Nueva función para obtener próximos eventos por casino
export async function getNextEventsByCasino(casinoId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .eq("casinoId", casinoId)
    .gt("from", new Date().toISOString().split("T")[0])
    .not("draft", "is", true)
    .order("from", { ascending: true });

  if (error) {
    console.error(`Error fetching next events for casino ${casinoId}:`, error);
    return [];
  }
  return data || [];
}

/**
 * Obtiene todos los torneos para un mes y año específicos.
 * Permite filtrar opcionalmente por casinoId, eventId o un array de starredCasinoIds.
 */
export async function getTournamentsForMonth(
  year: number,
  month: number, // 1-12
  filters?: {
    casinoId?: number;
    eventId?: number;
    starredCasinoIds?: number[];
    starredTournamentIds?: number[];
  }
): Promise<Database["public"]["Tables"]["Tournament"]["Row"][]> {
  noStore();
  const supabase = createClient();

  if (month < 1 || month > 12) {
    console.error("Mes inválido:", month);
    return [];
  }

  const startDate = formatISO(startOfMonth(new Date(year, month - 1)), {
    representation: "date",
  });
  const endDate = formatISO(endOfMonth(new Date(year, month - 1)), {
    representation: "date",
  });

  let query = supabase
    .from("Tournament")
    .select("*, event:Event(*, tour:Tour(*)), casino:Casino(*)") // Asegurar Tour anidado en Event
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  // Aplicar filtros opcionales (starredTournamentIds tiene máxima prioridad)
  if (
    filters?.starredTournamentIds &&
    filters.starredTournamentIds.length > 0
  ) {
    // Filtrar por torneos favoritos específicos
    query = query.in("id", filters.starredTournamentIds);
  } else if (filters?.starredCasinoIds && filters.starredCasinoIds.length > 0) {
    // Filtrar por casinos favoritos
    query = query.in("casinoId", filters.starredCasinoIds);
  } else if (filters?.casinoId) {
    // Filtrar por casino específico
    query = query.eq("casinoId", filters.casinoId);
  }

  if (filters?.eventId) {
    query = query.eq("eventId", filters.eventId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tournaments for month:", error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene todos los eventos cuyo rango de fechas se solapa
 * con un mes y año específicos.
 * Permite filtrar opcionalmente por casinoId o un array de starredCasinoIds.
 */
export async function getEventsForMonth(
  year: number,
  month: number, // 1-12
  filters?: {
    casinoId?: number;
    starredCasinoIds?: number[]; // Nuevo filtro
    // eventId no aplica aquí directamente, se filtra en el cliente/action
  }
): Promise<Database["public"]["Tables"]["Event"]["Row"][]> {
  noStore();
  const supabase = createClient();

  if (month < 1 || month > 12) {
    console.error("Mes inválido:", month);
    return [];
  }

  const monthStartDate = formatISO(startOfMonth(new Date(year, month - 1)), {
    representation: "date",
  });
  const monthEndDate = formatISO(endOfMonth(new Date(year, month - 1)), {
    representation: "date",
  });

  let query = supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .lte("from", monthEndDate)
    .gte("to", monthStartDate)
    .order("from", { ascending: true });

  // Aplicar filtros opcionales
  if (filters?.starredCasinoIds && filters.starredCasinoIds.length > 0) {
    // Priorizar filtro de casinos favoritos si existe
    query = query.in("casinoId", filters.starredCasinoIds);
  } else if (filters?.casinoId) {
    query = query.eq("casinoId", filters.casinoId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events for month:", error);
    return [];
  }

  return data || [];
}
