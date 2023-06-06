import CardTour from '../../../components/tour/CardTour'
import RowEventoV2 from '../../../components/evento/RowEventoV2'
import { notFound } from 'next/navigation'

import { getTour, getAllEventsByTour, getAllTours } from '../../../lib/prisma'
export const revalidate = 60

export default async function Page({ params }) {
    const tour = await getTour(params.slug)
    if (!tour.id) {
        notFound()
    }
    const events = await getAllEventsByTour(tour.id)
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-3/12 mt-6 space-y-4">
                    <CardTour tour={tour} />
                </div>
                <div className="md:w-9/12">
                    {events.length > 0 && (
                        <div>
                            <h1 className="text-4xl font-bold py-4">
                                Eventos de {tour.name}
                            </h1>
                            <div className="space-y-1 md:space-y-0.5">
                                {events.map((event) => (
                                    <RowEventoV2
                                        key={event.id}
                                        evento={event}
                                        showtour={false}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const circuitos = await getAllTours()

    return circuitos.map((circuito) => ({
        slug: circuito.slug,
    }))
}
