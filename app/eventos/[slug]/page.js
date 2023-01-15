export const revalidate = 60

import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import Calendar from '../../../components/calendar/Calendar'

import {
    getEvent,
    getAllTournamentsByEvent,
    getAllEvents,
} from '../../../lib/notion'
import RowTournamentV2 from '../../../components/tournament/RowTournamentV2'

export default async function Page({ params }) {
    const evento = await getEvent(params.slug)
    const torneos = await getAllTournamentsByEvent(evento.id)
    return (
        <main className="mx-5">
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
