import { getTour, getEventsByTour } from "@/lib/api";
import type { Metadata } from "next";
import CardTour from "@/components/tour/CardTour";
import RowEvent from "@/components/event/RowEvent";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const tour = await getTour(params.slug);
  if (!tour) {
    return <div>Not found</div>;
  }
  const events = await getEventsByTour(tour.id);

  metadata.title = `${tour.name} - Torneos Poker Live`;

  return (
    <div>
      <div className="md:flex gap-4">
        <div className="w-100 md:w-4/12 mt-6">
          <CardTour tour={tour} />
        </div>
        <div className="md:w-8/12">
          {events.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold py-4">
                Eventos de {tour.name}
              </h2>

              <div className="space-y-0.5">
                {events.map((event: any) => (
                  <div key={event.id} className="w-full">
                    <RowEvent event={event} showtour={false} />
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
