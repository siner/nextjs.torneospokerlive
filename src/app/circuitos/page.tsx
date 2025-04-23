import { getAllTours } from "@/lib/api";
import type { Metadata } from "next";
import CardTour from "@/components/tour/CardTour";

export const metadata: Metadata = {
  title: "Circuitos de poker en España - Torneos Poker Live",
  description: "",
};

export default async function Home() {
  const tours = await getAllTours();

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Circuitos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tours.map((tour: any) => (
          <div key={"circuito-" + tour.id} className="w-full">
            <CardTour tour={tour} />
          </div>
        ))}
      </div>
    </div>
  );
}
