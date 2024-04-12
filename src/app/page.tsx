import {
  getCurrentEvents,
  getNextEvents,
  getTodayTournaments,
  getTomorrowTournaments,
} from "@/lib/api";
import RowTournament from "@/components/tournament/RowTournament";
import CardEvent from "@/components/event/CardEvent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RowEvent from "@/components/event/RowEvent";

export default async function Home() {
  const todayTournaments = await getTodayTournaments();
  const tomorrowTournaments = await getTomorrowTournaments();
  const currentEvents = await getCurrentEvents();
  const nextEvents = await getNextEvents();

  return (
    <>
      <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentEvents.map((event: any) => (
          <div key={"event-" + event.id}>
            <CardEvent event={event} showCasino />
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold py-4">Torneos de Hoy</h2>
      <div className="space-y-0.5">
        {todayTournaments?.map((torneo) => (
          <RowTournament
            key={"torneo-" + torneo.id}
            torneo={torneo}
            casino="true"
            event="true"
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold py-4">Torneos de Mañana</h2>
      <div className="space-y-0.5">
        {tomorrowTournaments?.map((torneo) => (
          <RowTournament
            key={"torneo-" + torneo.id}
            torneo={torneo}
            casino="true"
            event="true"
          />
        ))}
      </div>
      <div className="text-right mt-4">
        <Link href="/torneos">
          <Button>Ver Todos los Torneos</Button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold py-4">Próximos eventos live</h2>
      <div className="space-y-2">
        {nextEvents.map((event) => (
          <RowEvent key={"event-" + event.id} event={event} showtour={true} />
        ))}
      </div>
      <div className="text-right mt-4">
        <Link href="/eventos">
          <Button>Ver Todos los Eventos</Button>
        </Link>
      </div>
    </>
  );
}
