import {
  getSearchTournaments,
  getSearchEvents,
  getSearchCasinos,
  getSearchTours,
} from "@/lib/api";
import RowTournament from "@/components/tournament/RowTournament";
import RowEvent from "@/components/event/RowEvent";
import CardCasino from "@/components/casino/CardCasino";
import CardTour from "@/components/tour/CardTour";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams?.q;
  const searchTournaments = await getSearchTournaments(q);
  const searchEvents = await getSearchEvents(q);
  const searchCasinos = await getSearchCasinos(q);
  const searchTours = await getSearchTours(q);

  return (
    <>
      <h1 className="text-3xl font-bold py-4">Resultados de la búsqueda</h1>

      {searchTournaments.length === 0 &&
        searchEvents.length === 0 &&
        searchCasinos.length === 0 &&
        searchTours.length === 0 && (
          <div className="text-center py-4">
            No se han encontrado resultados para la búsqueda{" "}
            <strong>{q}</strong>
          </div>
        )}

      {searchTournaments.length > 0 && (
        <>
          <h2 className="text-2xl font-bold py-4">Torneos</h2>
          <div className="space-y-0.5">
            {searchTournaments?.map((torneo) => (
              <RowTournament
                key={"torneo-" + torneo.id}
                torneo={torneo}
                casino="true"
                event="true"
              />
            ))}
          </div>
        </>
      )}

      {searchEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold py-4">Eventos</h2>
          <div className="space-y-2">
            {searchEvents.map((event: any) => (
              <RowEvent
                key={"event-" + event.id}
                event={event}
                showTour={true}
              />
            ))}
          </div>
        </>
      )}

      {searchCasinos.length > 0 && (
        <>
          <h2 className="text-2xl font-bold py-4">Casinos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchCasinos.map((casino: any) => (
              <CardCasino key={"casino-" + casino.id} casino={casino} />
            ))}
          </div>
        </>
      )}

      {searchTours.length > 0 && (
        <>
          <h2 className="text-2xl font-bold py-4">Circuitos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchTours.map((tour: any) => (
              <CardTour key={"tour-" + tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
