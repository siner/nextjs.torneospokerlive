/* eslint-disable @next/next/no-img-element */
import { getEvent, getTournamentsByEvent } from "@/lib/api";
import CardTour from "@/components/tour/CardTour";
import RowTournament from "@/components/tournament/RowTournament";
import CardCasino from "@/components/casino/CardCasino";
import { getSimpleDate, getTextColor } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { format, parseISO, eachDayOfInterval, compareAsc } from "date-fns";
import { es } from "date-fns/locale";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);
  if (!event) {
    return {
      title: "Not found",
    };
  }
  return {
    title: `${event.name} - Torneos Poker Live`,
  };
}

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) {
    return <div>Not found</div>;
  }
  const allTournaments = await getTournamentsByEvent(event.id);

  const tournamentsByDate: { [key: string]: typeof allTournaments } = {};
  allTournaments.forEach((tournament) => {
    const dateStr = tournament.date;
    if (!tournamentsByDate[dateStr]) {
      tournamentsByDate[dateStr] = [];
    }
    tournamentsByDate[dateStr].push(tournament);
  });

  let eventDates: Date[] = [];
  try {
    const startDate = parseISO(event.from);
    const endDate = parseISO(event.to);
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      eventDates = eachDayOfInterval({ start: startDate, end: endDate });
    }
  } catch (e) {
    console.error("Error parsing event dates:", e);
  }

  const casinoBgColor = event.casino?.color || "#ffffff";
  const casinoTextColor = getTextColor(casinoBgColor);
  const dateFrom = getSimpleDate(event.from);
  const dateTo = getSimpleDate(event.to);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            {event.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xl">
            <CalendarDays className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">
              {dateFrom} - {dateTo}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {event.tour && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={"/circuitos/" + event.tour.slug}>
                      <img
                        src={event.tour.logo}
                        alt={`Logo ${event.tour.name}`}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-full object-contain"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{event.tour.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {event.casino && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar
                      className="h-20 w-20 border"
                      style={{ backgroundColor: casinoBgColor }}
                    >
                      <Link href={"/casinos/" + event.casino.slug}>
                        <img
                          src={event.casino.logo}
                          width={80}
                          height={80}
                          alt={`Logo ${event.casino.name}`}
                          className="h-20 w-20 rounded-full object-contain"
                        />
                      </Link>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{event.casino.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardContent>
      </Card>

      {eventDates.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold py-4">Programa del Evento</h2>
          <div className="space-y-4">
            {eventDates.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const dailyTournaments = tournamentsByDate[dayStr] || [];

              if (dailyTournaments.length > 0) {
                dailyTournaments.sort((a, b) =>
                  compareAsc(
                    parseISO(`1970-01-01T${a.time || "00:00"}:00`),
                    parseISO(`1970-01-01T${b.time || "00:00"}:00`)
                  )
                );
                return (
                  <div key={dayStr}>
                    <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                      {format(day, "EEEE, d 'de' MMMM", { locale: es })}
                    </h3>
                    <Card>
                      <CardContent className="p-0">
                        <div className="space-y-0">
                          {dailyTournaments.map((tournament: any) => (
                            <RowTournament
                              key={"tournament-" + tournament.id}
                              torneo={tournament}
                              event={false}
                              casino={false}
                              hideDate={false}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      {allTournaments.length === 0 && (
        <p className="text-muted-foreground py-4">
          No hay torneos programados para este evento todavía.
        </p>
      )}
    </div>
  );
}
