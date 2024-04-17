import { getAllCasinos } from "@/lib/api";
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

  const casinos = await getAllCasinos();
  return casinos.map((casino) => ({
    url: `${base_url}/casinos/${casino.slug}`,
  }));
}
