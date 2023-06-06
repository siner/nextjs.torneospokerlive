import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import Calendar from '../../../components/calendar/Calendar'
import RowTournamentV2 from '../../../components/tournament/RowTournamentV2'
import { notFound } from 'next/navigation'
export const revalidate = 60

import {
    getEvent,
    getAllTournamentsByEvent,
    getAllEvents,
} from '../../../lib/prisma'

export default async function Page({ params }) {
    const evento = await getEvent(params.slug)

    if (!evento.id) {
        notFound()
    }
    var torneos = await getAllTournamentsByEvent(evento.id)

    /** @type {import('schema-dts').Event} */
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: evento.name,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: evento.casino.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: '',
                postalCode: '',
                addressRegion: '',
                addressCountry: '',
            },
        },
        organizer: {
            '@type': 'Organization',
            name: evento.tour.name,
        },
        image: [evento.tour.logo],
        description:
            'Evento de poker ' +
            evento.name +
            ' en el casino ' +
            evento.casino.name,
        startDate: evento.from,
        endDate: evento.to,
    }

    return (
        <main className="mx-5">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <div className="md:flex gap-8">
                <div className="w-100 md:w-4/12 mt-6 space-y-4">
                    <CardEvento evento={evento} />
                    <CardCasino casino={evento.casino} />
                </div>
                <div className="md:w-8/12">
                    {torneos.length > 0 && (
                        <div>
                            <h1 className="text-4xl font-bold py-4">
                                Torneos de {evento.name}
                            </h1>
                            <div className="space-y-1 md:space-y-0.5">
                                {torneos.map((torneo) => (
                                    <RowTournamentV2
                                        key={torneo.id}
                                        torneo={torneo}
                                        casino={false}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full hidden lg:block">
                <h2 className="text-4xl font-bold py-4 text-center">
                    Calendario
                </h2>
                <Calendar torneos={torneos} value={evento.from} />
            </div>
        </main>
    )
}
export async function generateStaticParams() {
    const events = await getAllEvents()

    return events.map((event) => ({
        slug: event.slug,
    }))
}
