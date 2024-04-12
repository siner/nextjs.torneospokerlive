import { getAllCasinos } from "@/lib/api";
import type { Metadata } from "next";
import CardCasino from "@/components/casino/CardCasino";
export const metadata: Metadata = {
  title: "Casinos de España - Torneos Poker Live",
  description: "",
};

export default async function Home() {
  const casinos = await getAllCasinos();

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Casinos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {casinos.map((casino) => (
          <div key={casino.id} className="w-full">
            <CardCasino casino={casino} />
          </div>
        ))}
      </div>
    </div>
  );
}
