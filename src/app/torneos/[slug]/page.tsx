import { getTournament, getStarredTournamentIds } from "@/lib/api";
import CardCasino from "@/components/casino/CardCasino";
import CardEvent from "@/components/event/CardEvent";
import { formatDate, getTextColor } from "@/lib/utils";
import { remark } from "remark";
import html from "remark-html";
import {
  Coins,
  Star,
  Gift,
  Hourglass,
  Clock,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateOgImageUrl } from "@/lib/og-image";
import { createClient } from "@/lib/supabase/server";
import { TournamentStar } from "@/components/tournament/TournamentStar";
import { ShareButtons } from "@/components/ui/share-buttons";
import { getCommentsByEntity } from "@/lib/supabase/queries/universal-comments";
import { UniversalCommentSection } from "@/components/universal/UniversalCommentSection";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const tournament = await getTournament(params.slug);
  if (!tournament) {
    return {
      title: "Not found",
    };
  }

  const description = `Torneo ${tournament.name} en ${
    tournament.casino?.name || ""
  }${
    tournament.buyin > 0 ? ` - Buy-in: ${tournament.buyin}€` : ""
  }. Fecha: ${new Date(tournament.date).toLocaleDateString("es-ES")}.`;

  // Descripción corta para Twitter (máximo 200 caracteres)
  const twitterDescription = `${tournament.casino?.name || ""}${
    tournament.buyin > 0 ? ` • ${tournament.buyin}€` : ""
  } • ${new Date(tournament.date).toLocaleDateString("es-ES")}`;

  const ogImage = generateOgImageUrl({
    name: tournament.name,
    logo: tournament.casino?.logo,
    color: tournament.casino?.color,
    subtitle: tournament.buyin > 0 ? `${tournament.buyin}€` : undefined,
    type: "torneo",
  });

  return {
    title: `${tournament.name} - Torneos Poker Live`,
    description,
    openGraph: {
      title: `${tournament.name}`,
      description,
      url: `https://www.torneospokerlive.com/torneos/${params.slug}`,
      siteName: "Torneos Poker Live",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tournament.name}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@livetorneos",
      creator: "@livetorneos",
      title: `${tournament.name}`,
      description: twitterDescription,
      images: [
        {
          url: ogImage,
          alt: `${tournament.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.torneospokerlive.com/torneos/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const tournament = await getTournament(params.slug);
  if (!tournament) {
    return <div>Not found</div>;
  }

  // Verificar si el usuario está autenticado y si tiene este torneo en favoritos
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  let isStarred = false;

  if (user) {
    const starredTournamentIds = await getStarredTournamentIds(user.id);
    isStarred = starredTournamentIds.includes(tournament.id);
  }

  const event = tournament.event;
  const casino = tournament.casino;
  let backgroundColor = "#ffffff";
  if (tournament.casino) backgroundColor = tournament.casino.color;
  const textColor = getTextColor(backgroundColor);
  let { datestring, hour } = formatDate(tournament.date);
  if (tournament.time) hour = tournament.time.substring(0, 5);
  else hour = "";

  const processedContent = await remark().use(html).process(tournament.content);
  const contentHtml = processedContent.toString();

  // Obtener comentarios del torneo
  const comments = await getCommentsByEntity("tournament", tournament.id);

  /** @type {import('schema-dts').Event} */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: casino.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: "",
        postalCode: "",
        addressRegion: "",
        addressCountry: "",
      },
    },
    name: tournament.name,
    description:
      "Torneo de poker " + tournament.name + " en el casino " + casino.name,
    organizer: {
      "@type": "Organization",
      name: casino.name,
    },
    image: [casino.logo],
    startDate: tournament.date,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="md:flex gap-4 space-y-4 md:space-y-0 mt-10">
        <div className="md:w-8/12 space-y-6">
          <Card style={{ backgroundColor: backgroundColor, color: textColor }}>
            <CardContent className="p-5 flex justify-between items-center">
              <h1 className="text-2xl font-bold md:text-3xl mr-4">
                {tournament.name}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  style={{
                    color: textColor,
                    borderColor: textColor,
                  }}
                  className="[&_button]:text-current [&_button]:border-current [&_svg]:text-current"
                >
                  <ShareButtons
                    url={`https://www.torneospokerlive.com/torneos/${params.slug}`}
                    title={tournament.name}
                    description={`${tournament.casino?.name || ""}${
                      tournament.buyin > 0
                        ? ` • Buy-in: ${tournament.buyin}€`
                        : ""
                    } • ${datestring}`}
                  />
                </div>
                {user && (
                  <TournamentStar
                    tournamentId={tournament.id.toString()}
                    userId={user.id}
                    isStarred={isStarred}
                  />
                )}
                {tournament.buyin > 0 && (
                  <div className="text-3xl md:text-4xl font-bold text-right">
                    {tournament.buyin}€
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <span>
                  {datestring} {hour ? ` - ${hour}` : ""}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournament.buyin > 0 && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Buy In
                      </CardTitle>
                      <Coins className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{`${tournament.buyin}€`}</div>
                      {tournament.fee > 0 && (
                        <p className="text-xs text-muted-foreground">
                          (
                          {tournament.buyin -
                            tournament.fee -
                            tournament.bounty >
                          0
                            ? `${
                                tournament.buyin -
                                tournament.fee -
                                tournament.bounty
                              }€ + `
                            : ""}
                          {tournament.fee > 0 ? `${tournament.fee}€ fee` : ""}
                          {tournament.bounty > 0
                            ? ` + ${tournament.bounty}€ KO`
                            : ""}
                          )
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}

                {tournament.points && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Puntos
                      </CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {tournament.points}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tournament.punctuality && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Puntualidad
                      </CardTitle>
                      <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg">{tournament.punctuality}</div>
                    </CardContent>
                  </Card>
                )}

                {tournament.registerlevels && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Registro hasta
                      </CardTitle>
                      <Hourglass className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        Nivel {tournament.registerlevels}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tournament.leveltime && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Duración Niveles
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {tournament.leveltime}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {contentHtml && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </CardContent>
            </Card>
          )}
        </div>
        <div className="md:w-4/12 space-y-4">
          {event && <CardEvent event={event} showCasino={false} />}
          {casino && <CardCasino casino={casino} />}
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="container mx-auto px-4 max-w-4xl">
        <UniversalCommentSection
          comments={comments}
          entityType="tournament"
          entityId={tournament.id}
        />
      </div>
    </div>
  );
}
