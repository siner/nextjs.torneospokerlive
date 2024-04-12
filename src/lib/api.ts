import { createClient } from "@/lib/supabase/server";

export async function getAllTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTodayTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq("date", new Date().toISOString().split("T")[0]);
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
    );
  if (error) throw error;
  return data;
}

export async function getNextTournaments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTournament(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Tournament")
    .select("*, casino:Casino(*), event:Event(*, tour:Tour(*))")
    .eq("slug", slug);
  if (error) throw error;
  return data[0];
}

export async function getAllCasinos() {
  const supabase = createClient();
  const { data, error } = await supabase.from("Casino").select("*");
  if (error) throw error;
  return data;
}

export async function getCasino(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Casino")
    .select("*")
    .eq("slug", slug);
  if (error) throw error;
  return data[0];
}

export async function getEventsByCasino(casinoId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .eq("casinoId", casinoId);
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
    .order("date", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getAllTours() {
  const supabase = createClient();
  const { data, error } = await supabase.from("Tour").select("*");
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

export async function getEventsByTour(tourId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .eq("tourId", tourId);
  if (error) throw error;
  return data;
}

export async function getNextEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .gte("from", new Date().toISOString().split("T")[0])
    .order("from", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getCurrentEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .gte("to", new Date().toISOString().split("T")[0])
    .lte("from", new Date().toISOString().split("T")[0])
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
    .order("date", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getPastEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, casino:Casino(*), tour:Tour(*)")
    .lte("to", new Date().toISOString().split("T")[0])
    .order("from", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getEvent(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select("*, tour:Tour(*), casino:Casino(*)")
    .eq("slug", slug);
  if (error) throw error;
  return data[0];
}
