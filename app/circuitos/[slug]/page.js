export const runtime = 'edge'
export const revalidate = 60

import CardTour from '../../../components/tour/CardTour'
import RowEvento from '../../../components/evento/RowEvento'

import { getTour, getAllEventsByTour, getAllTours } from '../../../lib/notion'

export default async function Page({ params }) {
    const tour = await getTour(params.slug)
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
                            <div className="space-y-1">
                                {events.map((event) => (
                                    <RowEvento key={event.id} evento={event} />
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
