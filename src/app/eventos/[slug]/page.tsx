import { getEvent, getTournamentsByEvent } from "@/lib/api";
import CardTour from "@/components/tour/CardTour";
import RowTournament from "@/components/tournament/RowTournament";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);
  return {
    title: `${event.name} - Torneos Poker Live`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) {
    return <div>Not found</div>;
  }
  const tournaments = await getTournamentsByEvent(event.id);

  return (
    <div>
      <div className="md:flex gap-4">
        <div className="w-100 md:w-4/12 mt-6">
          <CardTour tour={event.tour} />
        </div>
        <div className="md:w-8/12">
          {tournaments.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold py-4">
                Torneos de {event.name}
              </h2>

              <div className="space-y-0.5">
                {tournaments.map((tournament: any) => (
                  <div key={event.id} className="w-full">
                    <RowTournament
                      torneo={tournament}
                      event={false}
                      casino={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
