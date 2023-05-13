export const revalidate = 60

import CardCasino from '../../../components/casino/CardCasino'
import Calendar from '../../../components/calendar/Calendar'
import {
    getAllCasinos,
    getCasino,
    getNextTournamentsByCasino,
    getPastTournamentsByCasino,
} from '../../../lib/prisma'
import RowTournamentV2 from '../../../components/tournament/RowTournamentV2'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
    const env = process.env.NODE_ENV

    const casino = await getCasino(params.slug)
    if (!casino.id) {
        notFound()
    }
    const torneos = await getNextTournamentsByCasino(casino.id)
    var pasttorneos = []
    if (env == 'development') {
        pasttorneos = await getPastTournamentsByCasino(casino.id)
    }

    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-4/12 mt-6">
                    <CardCasino casino={casino} />
                    <div className="mt-4">
                        <div className="p-2 prose">
                            <ReactMarkdown>{casino.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="md:w-8/12">
                    {torneos.length > 0 && (
                        <div>
                            <h2 className="text-4xl font-bold py-4">
                                Próximos Torneos en {casino.name}
                            </h2>

                            <div className="space-y-0.5">
                                {torneos.map((torneo) => (
                                    <RowTournamentV2
                                        key={torneo.id}
                                        torneo={torneo}
                                        event={true}
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
                <Calendar torneos={torneos} />
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const casinos = await getAllCasinos()

    return casinos.map((casino) => ({
        slug: casino.slug,
    }))
}
