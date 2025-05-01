import {
  getCurrentEvents,
  getNextEvents,
  getTodayTournaments,
  getTomorrowTournaments,
} from "@/lib/api";
import { getLatestPosts } from "@/lib/supabase/queries/posts";
import { PostCard } from "@/components/news/PostCard";
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
import { formatDate } from "@/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const todayTournaments = await getTodayTournaments();
  const tomorrowTournaments = await getTomorrowTournaments();
  const currentEvents = await getCurrentEvents();
  const nextEvents = await getNextEvents();
  const latestPosts = await getLatestPosts(3);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const { datestring: todayDateString } = formatDate(today);
  const { datestring: tomorrowDateString } = formatDate(tomorrow);

  const code = searchParams?.code;
  if (code) {
    redirect(`/login?code=${code}`);
  }

  const noEventos = currentEvents.length === 0 && nextEvents.length === 0;
  const noTorneos =
    todayTournaments.length === 0 && tomorrowTournaments.length === 0;
  const noContenido = noEventos && noTorneos;

  return (
    <>
      {/* Contenido principal solo si hay algo que mostrar */}
      {!noContenido && (
        <>
          {/* Eventos actuales */}
          {currentEvents.length > 0 && (
            <>
              <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {currentEvents.map((event: any) => (
                  <div key={"event-" + event.id}>
                    <CardEvent event={event} showCasino />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Torneos de hoy */}
          {todayTournaments.length > 0 && (
            <>
              <h2 className="text-2xl font-bold py-4">
                Torneos de Hoy ({todayDateString})
              </h2>
              <div className="space-y-0.5 mb-6">
                {todayTournaments.map((torneo) => (
                  <RowTournament
                    key={"torneo-" + torneo.id}
                    torneo={torneo}
                    casino="true"
                    event="true"
                    hideDate={true}
                  />
                ))}
              </div>
            </>
          )}

          {/* Torneos de mañana */}
          {tomorrowTournaments.length > 0 && (
            <>
              <h2 className="text-2xl font-bold py-4">
                Torneos de Mañana ({tomorrowDateString})
              </h2>
              <div className="space-y-0.5 mb-6">
                {tomorrowTournaments.map((torneo) => (
                  <RowTournament
                    key={"torneo-" + torneo.id}
                    torneo={torneo}
                    casino="true"
                    event="true"
                    hideDate={true}
                  />
                ))}
              </div>
              <div className="text-right mt-4">
                <Link href="/torneos">
                  <Button>Ver Todos los Torneos</Button>
                </Link>
              </div>
            </>
          )}

          {/* Próximos eventos */}
          {nextEvents.length > 0 && (
            <>
              <h2 className="text-2xl font-bold py-4">Próximos eventos live</h2>
              <div className="space-y-2 mb-6">
                {nextEvents.map((event) => (
                  <RowEvent
                    key={"event-" + event.id}
                    event={event}
                    showtour={true}
                  />
                ))}
              </div>
              <div className="text-right mt-4">
                <Link href="/eventos">
                  <Button>Ver Todos los Eventos</Button>
                </Link>
              </div>
            </>
          )}
        </>
      )}

      {/* Sección de Últimas Noticias (se muestra incluso si no hay eventos/torneos) */}
      {latestPosts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold py-4 mt-6">Últimas Noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-right mt-4">
            <Link href="/noticias">
              <Button>Ver Todas las Noticias</Button>
            </Link>
          </div>
        </>
      )}

      {/* Si no hay ningún contenido principal, mensaje amigable */}
      {noContenido && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-6">
          <h2 className="text-2xl font-bold">
            Actualmente no hay eventos ni torneos programados.
          </h2>
          <p className="text-muted-foreground">
            ¡Vuelve pronto o añade uno nuevo!
          </p>
        </div>
      )}

      {/* Cards secundarias siempre al final */}
      <section className="w-full max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full flex flex-col justify-between">
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
              <Link href="https://www.twitter.com/livetorneos" target="_blank">
                <Button>
                  <TwitterLogoIcon className="w-6 h-6 mr-2" />
                  Twitter
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full flex flex-col justify-between">
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
      </section>
    </>
  );
}
