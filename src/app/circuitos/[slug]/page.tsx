import { getTour, getEventsByTour } from "@/lib/api";
import type { Metadata } from "next";
import CardTour from "@/components/tour/CardTour";
import RowEvent from "@/components/event/RowEvent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tour = await getTour(params.slug);
  if (!tour) {
    return {
      title: "Not found",
    };
  }

  const description = tour.description
    ? tour.description.substring(0, 160)
    : `Circuito de poker ${tour.name}. Consulta todos los eventos, torneos, fechas y ubicaciones del circuito ${tour.name}.`;

  return {
    title: `${tour.name} - Torneos Poker Live`,
    description,
    openGraph: {
      title: `${tour.name} - Circuito de Poker`,
      description,
      url: `https://www.torneospokerlive.com/circuitos/${params.slug}`,
      siteName: "Torneos Poker Live",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.name} - Circuito de Poker`,
      description,
    },
    alternates: {
      canonical: `https://www.torneospokerlive.com/circuitos/${params.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tour = await getTour(params.slug);
  if (!tour) {
    return <div>Not found</div>;
  }
  const events = await getEventsByTour(tour.id);

  // Structured Data para el circuito
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tour.name,
    url: `https://www.torneospokerlive.com/circuitos/${params.slug}`,
    logo: tour.logo,
    description: tour.description || `Circuito de poker ${tour.name}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                  <div key={"evento-" + event.id} className="w-full">
                    <RowEvent event={event} showTour={false} />
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
