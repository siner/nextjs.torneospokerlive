/**
 * Genera URLs para las imágenes Open Graph usando el Cloudflare Worker
 *
 * IMPORTANTE: Después de desplegar el worker, actualiza OG_WORKER_URL con tu URL real
 */

const OG_WORKER_URL =
  process.env.OG_WORKER_URL ||
  "https://torneospokerlive-og.edgefranmoreno.workers.dev";

interface OgImageParams {
  name: string;
  logo?: string;
  color?: string;
  subtitle?: string;
  type: "casino" | "torneo" | "evento" | "circuito";
}

export function generateOgImageUrl({
  name,
  logo,
  color,
  subtitle = "Torneos Poker Live",
  type,
}: OgImageParams): string {
  const params = new URLSearchParams({
    name,
    type,
    subtitle,
  });

  if (logo) {
    params.set("logo", logo);
  }

  if (color) {
    params.set("color", color);
  }

  return `${OG_WORKER_URL}?${params.toString()}`;
}
