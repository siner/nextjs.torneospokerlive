/* eslint-disable @next/next/no-img-element */
import {
  getEvent,
  getTournamentsByEvent,
  getStarredEventIds,
  getAllCasinos,
} from "@/lib/api";
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
import { generateOgImageUrl } from "@/lib/og-image";
import { createClient } from "@/lib/supabase/server";
import { EventStar } from "@/components/event/EventStar";
import { ShareButtons } from "@/components/ui/share-buttons";
import { getCommentsByEntity } from "@/lib/supabase/queries/universal-comments";
import { UniversalCommentSection } from "@/components/universal/UniversalCommentSection";
import EventoTorneosClient from "./client";

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

  const dateFrom = format(parseISO(event.from), "d 'de' MMMM", { locale: es });
  const dateTo = format(parseISO(event.to), "d 'de' MMMM", { locale: es });
  const description = `${event.name} en ${
    event.casino?.name || ""
  }. Del ${dateFrom} al ${dateTo}.${
    event.tour ? ` Circuito ${event.tour.name}.` : ""
  }`;

  // Descripción corta para Twitter (máximo 200 caracteres)
  const twitterDescription = `${event.casino?.name || ""}${
    event.tour ? ` • ${event.tour.name}` : ""
  } • ${dateFrom} al ${dateTo}`;

  // Para eventos, pasamos ambos logos separados por coma
  const eventLogos = [event.casino?.logo, event.tour?.logo]
    .filter(Boolean)
    .join(",");

  const ogImage = generateOgImageUrl({
    name: event.name,
    logo: eventLogos,
    color: event.casino?.color,
    subtitle: `${dateFrom} - ${dateTo}`,
    type: "evento",
  });

  return {
    title: `${event.name} - Torneos Poker Live`,
    description,
    openGraph: {
      title: `${event.name}`,
      description,
      url: `https://www.torneospokerlive.com/eventos/${params.slug}`,
      siteName: "Torneos Poker Live",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${event.name}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@livetorneos",
      creator: "@livetorneos",
      title: `${event.name}`,
      description: twitterDescription,
      images: [
        {
          url: ogImage,
          alt: `${event.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.torneospokerlive.com/eventos/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) {
    return <div>Not found</div>;
  }

  // Verificar si el usuario está autenticado y si tiene este evento en favoritos
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  let isStarred = false;

  if (user) {
    const starredEventIds = await getStarredEventIds(user.id);
    isStarred = starredEventIds.includes(event.id);
  }

  const allTournaments = await getTournamentsByEvent(event.id);
  const allCasinos = await getAllCasinos();

  // Obtener comentarios del evento
  const comments = await getCommentsByEntity("event", event.id);

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

  // Preparar datos para el componente cliente
  const tournamentsByDateArray = eventDates
    .map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const dailyTournaments = tournamentsByDate[dayStr] || [];

      // Ordenar por hora
      dailyTournaments.sort((a, b) =>
        compareAsc(
          parseISO(`1970-01-01T${a.time || "00:00"}:00`),
          parseISO(`1970-01-01T${b.time || "00:00"}:00`)
        )
      );

      return {
        date: format(day, "EEEE, d 'de' MMMM", { locale: es }),
        tournaments: dailyTournaments,
      };
    })
    .filter((day) => day.tournaments.length > 0);

  const casinoBgColor = event.casino?.color || "#ffffff";
  const casinoTextColor = getTextColor(casinoBgColor);
  const dateFrom = getSimpleDate(event.from);
  const dateTo = getSimpleDate(event.to);

  // Structured Data para eventos
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.from,
    endDate: event.to,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: event.casino
      ? {
          "@type": "Place",
          name: event.casino.name,
          address: event.casino.address
            ? {
                "@type": "PostalAddress",
                streetAddress: event.casino.address,
              }
            : undefined,
        }
      : undefined,
    image: event.casino?.logo || event.tour?.logo,
    description: `Evento de poker ${event.name}${
      event.casino ? ` en ${event.casino.name}` : ""
    }${event.tour ? ` del circuito ${event.tour.name}` : ""}`,
    organizer: event.tour
      ? {
          "@type": "Organization",
          name: event.tour.name,
        }
      : event.casino
      ? {
          "@type": "Organization",
          name: event.casino.name,
        }
      : undefined,
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center justify-between gap-4">
            <span>{event.name}</span>
            <div className="flex items-center gap-2">
              <ShareButtons
                url={`https://www.torneospokerlive.com/eventos/${params.slug}`}
                title={event.name}
                description={`${event.casino?.name || ""}${
                  event.tour ? ` • ${event.tour.name}` : ""
                } • Del ${dateFrom} al ${dateTo}`}
              />
              {user && (
                <EventStar
                  eventId={event.id.toString()}
                  userId={user.id}
                  isStarred={isStarred}
                />
              )}
            </div>
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
                        className="h-12 w-32 rounded-md object-contain p-1"
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
                    <Link href={"/casinos/" + event.casino.slug}>
                      <img
                        src={event.casino.logo}
                        width={80}
                        height={80}
                        alt={`Logo ${event.casino.name}`}
                        className="h-12 w-32 rounded-md object-contain p-1"
                      />
                    </Link>
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

      {allTournaments.length > 0 ? (
        <EventoTorneosClient
          tournamentsByDate={tournamentsByDateArray}
          casinos={allCasinos}
          eventName={event.name}
        />
      ) : (
        <p className="text-muted-foreground py-4 text-center">
          No hay torneos programados para este evento todavía.
        </p>
      )}

      {/* Sección de comentarios */}
      <div className="container mx-auto px-4 max-w-4xl">
        <UniversalCommentSection
          comments={comments}
          entityType="event"
          entityId={event.id}
        />
      </div>
    </div>
  );
}
