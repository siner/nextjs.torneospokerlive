import RowTournamentV2 from '../components/tournament/RowTournamentV2'
import CardEvento from '../components/evento/CardEvento'

import {
    getTodayTournaments,
    getCurrentEvents,
    getNextEvents,
} from '../lib/prisma'
import Link from 'next/link'
import RowEventoV2 from '../components/evento/RowEventoV2'
export const revalidate = 60

export default async function Page() {
    const torneos = await getTodayTournaments()
    const currentevents = await getCurrentEvents()
    const nextevents = await getNextEvents()

    return (
        <main className="mx-10">
            {currentevents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold py-4">
                        Eventos live actuales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {currentevents.map((event) => (
                            <CardEvento key={event.id} evento={event} />
                        ))}
                    </div>
                </div>
            )}

            {torneos.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold py-4">Torneos de Hoy</h2>
                    <div className="space-y-0.5">
                        {torneos?.map((torneo) => (
                            <RowTournamentV2
                                key={torneo.id}
                                torneo={torneo}
                                casino="true"
                                event="true"
                            />
                        ))}
                    </div>
                    <div className="text-right mt-4">
                        <Link className="btn" href="/torneos">
                            Ver Todos
                        </Link>
                    </div>
                </div>
            )}
            {nextevents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold py-4">
                        Próximos eventos live
                    </h2>
                    <div className="space-y-2">
                        {nextevents.map((event) => (
                            <RowEventoV2
                                key={event.id}
                                evento={event}
                                showtour={true}
                            />
                        ))}
                    </div>
                    <div className="text-right mt-4">
                        <Link className="btn" href="/eventos">
                            Ver Todos
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}
