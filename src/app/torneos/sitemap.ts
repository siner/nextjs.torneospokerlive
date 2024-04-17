import { getAllTournaments } from "@/lib/api";
import { MetadataRoute } from "next/types";

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const base_url = process.env.BASE_URL;

  const tournaments = await getAllTournaments();
  return tournaments.map((tournament) => ({
    url: `${base_url}/torneos/${tournament.slug}`,
  }));
}
