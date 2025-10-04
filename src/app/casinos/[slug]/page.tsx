/* eslint-disable @next/next/no-img-element */
import {
  getCasino,
  getNextTorneosByCasino,
  getNextEventsByCasino,
  getStarredCasinoIds,
} from "@/lib/api";
import type { Metadata } from "next";
import RowTournament from "@/components/tournament/RowTournament";
import RowEvent from "@/components/event/RowEvent";
import { remark } from "remark";
import html from "remark-html";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { getTextColor } from "@/lib/utils";
import EventTournamentCalendar from "@/components/calendar/EventTournamentCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateOgImageUrl } from "@/lib/og-image";
import { createClient } from "@/lib/supabase/server";
import { CasinoStar } from "@/components/casino/CasinoStar";
import { ShareButtons } from "@/components/ui/share-buttons";
import { getCommentsByEntity } from "@/lib/supabase/queries/universal-comments";
import { UniversalCommentSection } from "@/components/universal/UniversalCommentSection";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const casino = await getCasino(params.slug);
  if (!casino) {
    return {
      title: "Not found",
    };
  }

  const description = casino.description
    ? casino.description.substring(0, 160)
    : `Consulta todos los torneos y eventos de poker en ${casino.name}. Información actualizada sobre próximos torneos, buy-ins, garantizados y más.`;

  // Descripción corta para Twitter (máximo 200 caracteres)
  const twitterDescription = casino.address
    ? `${casino.address} • Torneos de Poker`
    : "Torneos de Poker";

  const ogImage = generateOgImageUrl({
    name: casino.name,
    logo: casino.logo,
    color: casino.color,
    subtitle: "Torneos Poker Live",
    type: "casino",
  });

  return {
    title: `${casino.name} - Torneos Poker Live`,
    description,
    openGraph: {
      title: `${casino.name} - Torneos de Poker`,
      description,
      url: `https://www.torneospokerlive.com/casinos/${params.slug}`,
      siteName: "Torneos Poker Live",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${casino.name} - Torneos Poker Live`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@livetorneos",
      creator: "@livetorneos",
      title: `${casino.name}`,
      description: twitterDescription,
      images: [
        {
          url: ogImage,
          alt: `${casino.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.torneospokerlive.com/casinos/${params.slug}`,
    },
  };
}
export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const casino = await getCasino(params.slug);
  if (!casino) {
    return <div>Not found</div>;
  }

  // Verificar si el usuario está autenticado y si tiene este casino en favoritos
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  let isStarred = false;

  if (user) {
    const starredCasinoIds = await getStarredCasinoIds(user.id);
    isStarred = starredCasinoIds.includes(casino.id);
  }

  const torneos = await getNextTorneosByCasino(casino.id);
  const nextEvents = await getNextEventsByCasino(casino.id);

  const processedDescription = await remark()
    .use(html)
    .process(casino.description || "");
  const descriptionHtml = processedDescription.toString();

  const processedContent = await remark()
    .use(html)
    .process(casino.content || "");
  const contentHtml = processedContent.toString();

  // Obtener comentarios del casino
  const comments = await getCommentsByEntity("casino", casino.id);

  const casinoBgColor = casino.color || "#ffffff";
  const casinoTextColor = getTextColor(casinoBgColor);

  // Structured Data para SEO y ChatGPT
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Casino",
    name: casino.name,
    image: casino.logo,
    url: `https://www.torneospokerlive.com/casinos/${params.slug}`,
    description: casino.description || `Casino ${casino.name}`,
    address: casino.address
      ? {
          "@type": "PostalAddress",
          streetAddress: casino.address,
        }
      : undefined,
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Card style={{ backgroundColor: casinoBgColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-4">
          <div className="flex-grow w-full md:w-auto md:mr-4 order-2 md:order-1">
            <CardHeader className="p-0 mb-2">
              <CardTitle
                className="text-2xl md:text-3xl font-bold flex items-center justify-between gap-4"
                style={{ color: casinoTextColor }}
              >
                <span>{casino.name}</span>
                <div className="flex items-center gap-2">
                  <ShareButtons
                    url={`https://www.torneospokerlive.com/casinos/${params.slug}`}
                    title={casino.name}
                    description={`Torneos y eventos de poker • ${
                      casino.address || "Madrid, España"
                    }`}
                  />
                  {user && (
                    <CasinoStar
                      casinoId={casino.id.toString()}
                      userId={user.id}
                      isStarred={isStarred}
                    />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            {contentHtml && (
              <div
                className="max-w-none text-sm"
                style={{ color: casinoTextColor }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
          </div>
          <div
            className="w-32 md:w-40 flex-shrink-0 mx-auto md:mx-0 order-1 md:order-2"
            style={{ backgroundColor: casinoBgColor }}
          >
            <img
              src={casino.logo}
              alt={`Logo ${casino.name}`}
              width={200}
              height={200}
              className="object-contain p-1 w-full h-auto"
            />
          </div>
        </div>
        {descriptionHtml && casino.description && (
          <CardContent className="pt-0 px-6 pb-6">
            <div
              className="prose dark:prose-invert max-w-none mt-4 border-t pt-4"
              style={{ color: casinoTextColor }}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </CardContent>
        )}
      </Card>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <div className="mt-4 space-y-6">
            {nextEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold pb-4">
                  Próximos Eventos en {casino.name}
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {nextEvents.map((event) => (
                        <RowEvent
                          key={"event-" + event.id}
                          event={event}
                          showCasino={false}
                          showTour={true}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {torneos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold pb-4">
                  Próximos Torneos en {casino.name}
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {torneos.map((torneo) => (
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
            )}
            {nextEvents.length === 0 && torneos.length === 0 && (
              <p className="text-muted-foreground py-4">
                No hay próximos eventos ni torneos programados en {casino.name}.
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="calendario">
          <h2 className="text-xl font-semibold py-4 mt-4">
            Calendario de Torneos y Eventos en {casino.name}
          </h2>
          <EventTournamentCalendar casinoId={casino.id} />
        </TabsContent>
      </Tabs>

      {/* Sección de comentarios */}
      <div className="container mx-auto px-4 max-w-4xl">
        <UniversalCommentSection
          comments={comments}
          entityType="casino"
          entityId={casino.id}
        />
      </div>
    </div>
  );
}
