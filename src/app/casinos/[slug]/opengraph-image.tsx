import CardCasinoOpengraph from "@/components/casino/CardCasinoOpengraph";
import { getCasino } from "@/lib/api";
import { ImageResponse } from "next/og";

// Image metadata
export var alt = "Imagen de casino";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const casino = await getCasino(params.slug);
  alt = `Imagen de casino ${casino.name}`;
  return new ImageResponse(<CardCasinoOpengraph casino={casino} />, {
    ...size,
  });
}
