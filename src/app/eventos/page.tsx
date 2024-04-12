import { getCurrentEvents, getNextEvents } from "@/lib/api";
import type { Metadata } from "next";
import CardEvent from "@/components/event/CardEvent";
import RowEvent from "@/components/event/RowEvent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Todos los eventos de poker en vivo de España - Torneos Poker Live",
  description: "",
};

export default async function Home() {
  const currentEvents = await getCurrentEvents();
  const nextEvents = await getNextEvents();

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentEvents.map((event: any) => (
          <div key={event.id}>
            <CardEvent event={event} showCasino />
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold py-4">Próximos eventos live</h2>
      <div className="space-y-2">
        {nextEvents.map((event: any) => (
          <div key={event.id}>
            <RowEvent event={event} showCasino />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/eventos/pasados">
          <Button>Ver eventos pasados</Button>
        </Link>
      </div>
    </div>
  );
}
