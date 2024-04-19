import CardTourOpengraph from "@/components/tour/CardTourOpengraph";
import { getTour } from "@/lib/api";
import { ImageResponse } from "next/og";

// Image metadata
export var alt = "Imagen de circuito";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const tour = await getTour(params.slug);
  alt = `Imagen de circuito ${tour.name}`;
  return new ImageResponse(<CardTourOpengraph tour={tour} />, {
    ...size,
  });
}
