import { getPastEvents } from "@/lib/api";
import type { Metadata } from "next";
import RowEvent from "@/components/event/RowEvent";
export const metadata: Metadata = {
  title:
    "Todos los eventos pasados de poker en vivo de España - Torneos Poker Live",
  description: "",
};

export const revalidate = 3600;

export default async function Home() {
  const pastEvents = await getPastEvents();

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Eventos live pasados</h2>
      <div className="space-y-0.5">
        {pastEvents.map((event: any) => (
          <div key={"evento-" + event.id}>
            <RowEvent event={event} showCasino showtour />
          </div>
        ))}
      </div>
    </div>
  );
}
