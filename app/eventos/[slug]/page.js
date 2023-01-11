export const revalidate = 60

import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import RowTournament from '../../../components/tournament/RowTournament'
import Calendar from '../../../components/calendar/Calendar'

import {
    getEvent,
    getAllTournamentsByEvent,
    getAllEvents,
} from '../../../lib/notion'

export default async function Page({ params }) {
    const evento = await getEvent(params.slug)
    const torneos = await getAllTournamentsByEvent(evento.id)
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-3/12 mt-6 space-y-4">
                    <CardEvento evento={evento} />
                    <CardCasino casino={evento.casino} />
                </div>
                <div className="md:w-9/12">
                    {torneos.length > 0 && (
                        <div>
                            <h1 className="text-4xl font-bold py-4">
                                Torneos de {evento.name}
                            </h1>
                            <div className="space-y-1">
                                {torneos.map((torneo) => (
                                    <RowTournament
                                        key={torneo.id}
                                        torneo={torneo}
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
