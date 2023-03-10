export const revalidate = 60

import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import Calendar from '../../../components/calendar/Calendar'
import RowTournamentV2 from '../../../components/tournament/RowTournamentV2'
import { notFound } from 'next/navigation'
import SuperJSON, { stringify } from 'superjson'

import {
    getEvent,
    getAllTournamentsByEvent,
    getAllEvents,
} from '../../../lib/prisma'
import Link from 'next/link'

export default async function Page({ params }) {
    const env = process.env.NODE_ENV

    const evento_json = await getEvent(params.slug)
    const evento = SuperJSON.parse(evento_json)

    if (!evento.id) {
        notFound()
    }
    var torneos = await getAllTournamentsByEvent(evento.id)

    return (
        <main className="mx-5">
            <div className="md:flex gap-8">
                <div className="w-100 md:w-4/12 mt-6 space-y-4">
                    <CardEvento evento={evento_json} />
                    {env == 'development' && (
                        <div className="text-right mt-4">
                            <Link
                                className="btn warning"
                                href={`/admin/evento/${evento.slug}`}
                            >
                                Editar
                            </Link>
                        </div>
                    )}
                    <CardCasino casino={evento.casino} />
                    {env == 'development' && (
                        <div className="text-right mt-4">
                            <Link
                                className="btn warning"
                                href={`/admin/casino/${evento.casino.slug}`}
                            >
                                Editar
                            </Link>
                        </div>
                    )}
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
                                        key={SuperJSON.parse(torneo).id}
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
                <Calendar
                    torneos={stringify(torneos)}
                    value={stringify(evento.from)}
                />
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const events = await getAllEvents()

    return events.map((event) => ({
        slug: SuperJSON.parse(event).slug,
    }))
}
