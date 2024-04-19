import {
  getCurrentEvents,
  getNextEvents,
  getMyCasinosCurrentEvents,
  getMyCasinosNextEvents,
} from "@/lib/api";
import type { Metadata } from "next";
import CardEvent from "@/components/event/CardEvent";
import RowEvent from "@/components/event/RowEvent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Todos los eventos de poker en vivo de España - Torneos Poker Live",
  description: "",
};
import SwitchMyCasinos from "@/components/casino/SwitchMyCasinos";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function Eventos({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  var currentEvents = [];
  var nextEvents = [];

  const supabase = createClient();
  const data = await supabase.auth.getUser();
  const user = data?.data.user;
  var nextTournaments = [];
  if (user && searchParams?.mycasinos) {
    currentEvents = await getMyCasinosCurrentEvents(user.id as string);
    nextEvents = await getMyCasinosNextEvents(user.id as string);
  } else {
    currentEvents = await getCurrentEvents();
    nextEvents = await getNextEvents();
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
        {user ? <SwitchMyCasinos /> : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentEvents.map((event: any) => (
          <div key={"evento-" + event.id}>
            <CardEvent event={event} showCasino />
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold py-4">Próximos eventos live</h2>
      <div className="space-y-2">
        {nextEvents.map((event: any) => (
          <div key={"evento-" + event.id}>
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
