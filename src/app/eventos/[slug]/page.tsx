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
  const tournaments = await getTournamentsByEvent(event.id);

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

      {tournaments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold py-4">Programa de Torneos</h2>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {tournaments.map((tournament: any) => (
                  <div key={"tournament-" + tournament.id} className="w-full">
                    <RowTournament
                      torneo={tournament}
                      event={false}
                      casino={false}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
