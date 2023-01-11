import RowTournament from '../components/tournament/RowTournament'
import LinkButton from '../components/elements/LinkButton'
import CardEvento from '../components/evento/CardEvento'

import {
    getTodayTournaments,
    getCurrentEvents,
    getNextEvents,
} from '../lib/notion'

export default async function Page() {
    const torneos = await getTodayTournaments()
    const currentevents = await getCurrentEvents()
    const nextevents = await getNextEvents()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentevents.map((event) => (
                    <CardEvento key={event.id} evento={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold py-4">Torneos de Hoy</h2>
            <div className="space-y-1">
                {torneos?.map((torneo) => (
                    <RowTournament
                        key={torneo.id}
                        torneo={torneo}
                        casino="true"
                        event="true"
                    />
                ))}
            </div>
            <div className="text-right mt-4">
                <LinkButton href="/torneos">Ver Todos</LinkButton>
            </div>

            <h2 className="text-2xl font-bold py-4">Eventos live futuros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {nextevents.map((event) => (
                    <CardEvento key={event.id} evento={event} />
                ))}
            </div>
        </main>
    )
}
