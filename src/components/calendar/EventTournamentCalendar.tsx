"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  fetchTournamentsForMonthAction,
  fetchEventsForMonthAction,
} from "@/app/actions/calendarActions";
import { Database } from "@/types/supabase";
import { format, getMonth, getYear, isSameDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import RowTournament from "@/components/tournament/RowTournament"; // Reutilizar si es posible
import RowEvent from "@/components/event/RowEvent"; // Reutilizar si es posible
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Para el estado de carga
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Tipos más precisos que reflejan las selecciones en las queries
type Casino = Database["public"]["Tables"]["Casino"]["Row"];
type Tour = Database["public"]["Tables"]["Tour"]["Row"];
type BaseEvent = Database["public"]["Tables"]["Event"]["Row"];
type BaseTournament = Database["public"]["Tables"]["Tournament"]["Row"];

// Evento con Casino y Tour (tal como se selecciona en getEventsForMonth)
interface EventWithRelations extends BaseEvent {
  Casino: Casino | null;
  Tour: Tour | null;
}

// Torneo con Evento (y su Tour) y Casino (tal como se selecciona en getTournamentsForMonth)
interface TournamentWithRelations extends BaseTournament {
  Casino: Casino | null;
  Event: (BaseEvent & { Tour: Tour | null }) | null; // Incluir Tour dentro de Event
}

// Usar estos tipos más precisos para el estado
type TournamentData = TournamentWithRelations[];
type EventData = EventWithRelations[];

interface EventTournamentCalendarProps {
  casinoId?: number;
  eventId?: number;
  starredCasinoIds?: number[];
  showCasino?: boolean;
}

export default function EventTournamentCalendar({
  casinoId,
  eventId,
  starredCasinoIds,
  showCasino = true,
}: EventTournamentCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date()); // Mes actual visible
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [tournaments, setTournaments] = useState<TournamentData>([]);
  const [events, setEvents] = useState<EventData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [datesWithData, setDatesWithData] = useState<Date[]>([]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const currentYear = getYear(month);
        const currentMonth = getMonth(month) + 1; // date-fns month is 0-indexed

        const filters = { casinoId, eventId, starredCasinoIds };

        const [tournamentsData, eventsData] = await Promise.all([
          fetchTournamentsForMonthAction(currentYear, currentMonth, filters),
          fetchEventsForMonthAction(currentYear, currentMonth, filters),
        ]);

        setTournaments(tournamentsData as TournamentData);
        setEvents(eventsData as EventData);

        // Calcular días con datos
        const tournamentDates = tournamentsData.map((t) =>
          parseISO(t.date as any)
        );
        const eventDates = eventsData.flatMap((e) => {
          const start = parseISO(e.from as any);
          const end = parseISO(e.to as any);
          const dates = [];
          let currentDate = start;
          while (currentDate <= end) {
            dates.push(new Date(currentDate)); // Crear nueva instancia
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        });

        // Unir y eliminar duplicados
        const allDates = [...tournamentDates, ...eventDates];
        const uniqueDates = allDates.reduce((acc, date) => {
          if (!acc.some((d) => isSameDay(d, date))) {
            acc.push(date);
          }
          return acc;
        }, [] as Date[]);
        setDatesWithData(uniqueDates);
      } catch (err) {
        console.error("Client Error after fetching calendar data:", err);
        setError("No se pudieron cargar los datos del calendario.");
        setTournaments([]);
        setEvents([]);
        setDatesWithData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [month, casinoId, eventId, starredCasinoIds]);

  const selectedDayTournaments = tournaments.filter((t) =>
    isSameDay(parseISO(t.date as any), selectedDay || new Date(0))
  ); // Comparar con fecha válida
  const selectedDayEvents = events.filter((e) => {
    if (!selectedDay) return false;
    const start = parseISO(e.from as any);
    const end = parseISO(e.to as any);
    return selectedDay >= start && selectedDay <= end;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      <div className="md:col-span-1 flex flex-col justify-center items-center">
        <Calendar
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          month={month}
          onMonthChange={setMonth}
          locale={es} // Añadir localización española
          className="rounded-md border p-3 shadow"
          classNames={{
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
          }}
          modifiers={{
            hasData: datesWithData,
          }}
          modifiersStyles={{
            // Estilo para días con datos (ej: un punto debajo)
            // Esto es un poco más avanzado y puede requerir CSS personalizado o componentes
            // Por ahora, añadimos un estilo simple como negrita
            hasData: { fontWeight: "bold" },
          }}
          disabled={loading} // Deshabilitar mientras carga
        />
        {/* Leyenda simple */}
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Los días en <strong className="font-bold">negrita</strong> tienen
          eventos o torneos.
        </p>
      </div>

      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDay
                ? `Programa para ${format(selectedDay, "PPPP", { locale: es })}`
                : "Selecciona un día"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!loading && !error && !selectedDay && (
              <p className="text-muted-foreground">
                Selecciona un día en el calendario para ver los detalles.
              </p>
            )}
            {!loading &&
              !error &&
              selectedDay &&
              selectedDayEvents.length === 0 &&
              selectedDayTournaments.length === 0 && (
                <p className="text-muted-foreground">
                  No hay eventos ni torneos programados para este día.
                </p>
              )}
            {!loading &&
              !error &&
              selectedDay &&
              (selectedDayEvents.length > 0 ||
                selectedDayTournaments.length > 0) && (
                <div className="space-y-4">
                  {selectedDayEvents.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Eventos Activos</h3>
                      <div className="space-y-0.5 border rounded-md">
                        {selectedDayEvents.map((event) => (
                          <RowEvent
                            key={event.id}
                            event={event}
                            casino={showCasino}
                            tour={true}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedDayTournaments.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Torneos del Día</h3>
                      <div className="space-y-0.5 border rounded-md">
                        {selectedDayTournaments.map((torneo) => (
                          <RowTournament
                            key={torneo.id}
                            torneo={torneo}
                            casino={showCasino}
                            event={true}
                            hideDate={true}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
