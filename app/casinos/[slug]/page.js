export const runtime = 'edge'
export const revalidate = 60

import CardCasino from '../../../components/casino/CardCasino'
import RowTournament from '../../../components/tournament/RowTournament'
import RowCashgame from '../../../components/cashgame/RowCashgame'
import LinkButton from '../../../components/elements/LinkButton'
import Calendar from '../../../components/calendar/Calendar'
import { Suspense } from 'react'
import {
    getAllCasinos,
    getCasino,
    getNextTournamentsByCasino,
} from '../../../lib/notion'

export default async function Page({ params }) {
    const casino = await getCasino(params.slug)
    const torneos = await getNextTournamentsByCasino(casino.id)
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-3/12 mt-6">
                    <CardCasino casino={casino} />
                    <div className="mt-8">
                        {casino.url && (
                            <LinkButton href={casino.url} target="_blank">
                                Visitar web
                            </LinkButton>
                        )}
                    </div>
                </div>
                <div className="md:w-9/12">
                    <Suspense fallback={<p>Cargando torneos...</p>}>
                        {torneos.length > 0 && (
                            <div>
                                <h2 className="text-4xl font-bold py-4">
                                    Próximos Torneos en {casino.name}
                                </h2>
                                <div className="space-y-1">
                                    {torneos.map((torneo) => (
                                        <RowTournament
                                            key={torneo.id}
                                            torneo={torneo}
                                            event={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<p>Cargando torneos...</p>}>
                <div className="w-full hidden lg:block">
                    <h2 className="text-4xl font-bold py-4 text-center">
                        Calendario
                    </h2>
                    <Calendar torneos={torneos} />
                </div>
            </Suspense>
        </main>
    )
}

export async function generateStaticParams() {
    const casinos = await getAllCasinos()

    return casinos.map((casino) => ({
        slug: casino.slug,
    }))
}
