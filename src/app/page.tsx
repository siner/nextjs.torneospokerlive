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
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const todayTournaments = await getTodayTournaments();
  const tomorrowTournaments = await getTomorrowTournaments();
  const currentEvents = await getCurrentEvents();
  const nextEvents = await getNextEvents();

  const code = searchParams?.code;
  if (code) {
    redirect(`/login?code=${code}`);
  }

  return (
    <>
      <div className="md:flex items-start justify-center gap-10">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentEvents.map((event: any) => (
              <div key={"event-" + event.id}>
                <CardEvent event={event} showCasino />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/3 space-y-4">
          <Card className="w-full mt-4">
            <CardHeader>
              <h2 className="text-2xl font-bold">Contacta con nosotros</h2>
            </CardHeader>
            <CardContent>
              <p>
                Si quieres decirnos algo, ponte en contacto con nosotros por
                alguna de nuestras vías.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Link href="/contacto">
                  <Button>Contacto</Button>
                </Link>
                <Link
                  href="https://www.twitter.com/livetorneos"
                  target="_blank"
                >
                  <Button>
                    <TwitterLogoIcon className="w-6 h-6 mr-2" />
                    Twitter
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full mt-4">
            <CardHeader>
              <h2 className="text-2xl font-bold">¿Echas en falta algo?</h2>
            </CardHeader>
            <CardContent>
              <p>
                Si echas en falta algún evento o torneo en nuestra web, puedes
                añadirlo tú mismo.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Link href="/eventos/add">
                  <Button>Nuevo Evento</Button>
                </Link>
                <Link href="/torneos/add">
                  <Button>Nuevo Torneo</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
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
