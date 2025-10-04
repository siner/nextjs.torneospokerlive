import { getTour, getEventsByTour, getStarredTourIds } from "@/lib/api";
import type { Metadata } from "next";
import CardTour from "@/components/tour/CardTour";
import RowEvent from "@/components/event/RowEvent";
import { generateOgImageUrl } from "@/lib/og-image";
import { createClient } from "@/lib/supabase/server";
import { TourStar } from "@/components/tour/TourStar";
import { ShareButtons } from "@/components/ui/share-buttons";

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

  // Descripción corta para Twitter
  const twitterDescription = "Circuito de Poker en España";

  const ogImage = generateOgImageUrl({
    name: tour.name,
    logo: tour.logo,
    color: tour.color,
    subtitle: "Circuito de Poker",
    type: "circuito",
  });

  return {
    title: `${tour.name} - Torneos Poker Live`,
    description,
    openGraph: {
      title: `${tour.name} - Circuito de Poker`,
      description,
      url: `https://www.torneospokerlive.com/circuitos/${params.slug}`,
      siteName: "Torneos Poker Live",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tour.name} - Circuito de Poker`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@livetorneos",
      creator: "@livetorneos",
      title: `${tour.name}`,
      description: twitterDescription,
      images: [
        {
          url: ogImage,
          alt: `${tour.name}`,
        },
      ],
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

  // Verificar si el usuario está autenticado y si tiene este circuito en favoritos
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  let isStarred = false;

  if (user) {
    const starredTourIds = await getStarredTourIds(user.id);
    isStarred = starredTourIds.includes(tour.id);
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
              <h2 className="text-4xl font-bold py-4 flex items-center justify-between gap-4">
                <span>Eventos de {tour.name}</span>
                <div className="flex items-center gap-2">
                  <ShareButtons
                    url={`https://www.torneospokerlive.com/circuitos/${params.slug}`}
                    title={tour.name}
                    description="Circuito de poker • Consulta todos los eventos"
                  />
                  {user && (
                    <TourStar
                      tourId={tour.id.toString()}
                      userId={user.id}
                      isStarred={isStarred}
                    />
                  )}
                </div>
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
