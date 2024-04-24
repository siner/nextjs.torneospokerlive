import { getTournament } from "@/lib/api";
import CardCasino from "@/components/casino/CardCasino";
import CardEvent from "@/components/event/CardEvent";
import { formatDate, getTextColor } from "@/lib/utils";
import { remark } from "remark";
import html from "remark-html";

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
  return {
    title: `${tournament.name} - Torneos Poker Live`,
  };
}

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const tournament = await getTournament(params.slug);
  if (!tournament) {
    return <div>Not found</div>;
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
        <div className="md:w-8/12">
          <div
            className="text-2xl font-bold flex justify-between items-center p-5"
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
            }}
          >
            <div className="flex flex-col items-left md:flex-row md:items-center w-2/3">
              {tournament.name}
            </div>
            {tournament.buyin && tournament.buyin > 0 && (
              <div className="text-4xl font-bold w-1/3 text-right">
                {tournament.buyin}€
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="font-bold mb-4">
              {datestring} {hour ? " - " + hour : ""}
            </div>
            <ul>
              {tournament.fee && (
                <li>
                  <strong>Buy In</strong>: {tournament.buyin}€{" "}
                  {tournament.fee &&
                    "(" +
                      (tournament.buyin - tournament.fee - tournament.bounty) +
                      "€ + " +
                      (tournament.bounty
                        ? tournament.bounty + "€ (bounty) + "
                        : "") +
                      "fee " +
                      tournament.fee +
                      "€)"}
                </li>
              )}

              {tournament.points && (
                <li>
                  <strong>Puntos</strong>: {tournament.points}
                </li>
              )}
              {tournament.punctuality && (
                <li>
                  <strong>Puntualidad</strong>: {tournament.punctuality}
                </li>
              )}
              {tournament.registerlevels && (
                <li>
                  <strong>Registro abierto hasta</strong>: Nivel{" "}
                  {tournament.registerlevels}
                </li>
              )}
              {tournament.leveltime && (
                <li>
                  <strong>Duración de los niveles</strong>:{" "}
                  {tournament.leveltime}
                </li>
              )}
            </ul>
            {contentHtml && (
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
          </div>
        </div>
        <div className="md:w-4/12 space-y-4">
          {event && <CardEvent event={event} showCasino={false} />}
          {casino && <CardCasino casino={casino} />}
        </div>
      </div>
    </div>
  );
}
