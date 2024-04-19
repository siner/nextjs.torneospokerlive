import CardTournamentOpengraph from "@/components/tournament/CardTournamentOpengraph";
import { getCasino, getTournament } from "@/lib/api";
import { ImageResponse } from "next/og";

// Image metadata
export var alt = "Imagen de torneo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const tournament = await getTournament(params.slug);
  alt = `Imagen de torneo ${tournament.name}`;
  return new ImageResponse(
    (
      <CardTournamentOpengraph
        tournament={tournament}
        casino={tournament.casino}
        event={tournament.event}
      />
    ),
    {
      ...size,
    }
  );
}
