import CardCasino from '../../../components/casino/CardCasino'
import RowTournament from '../../../components/tournament/RowTournament'
import RowCashgame from '../../../components/cashgame/RowCashgame'
import LinkButton from '../../../components/elements/LinkButton'
import Calendar from '../../../components/calendar/Calendar'

import { getCasino, getNextTournamentsByCasino } from '../../../lib/notion'
export const revalidate = 60

export default async function Page({ params }) {
    const casino = await getCasino(params.slug)
    const torneos = await getNextTournamentsByCasino(casino.id)
    const cashgames = []
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
                    {cashgames.length > 0 && (
                        <div>
                            <h2 className="text-4xl font-bold py-4">
                                Cash en {casino.name}
                            </h2>
                            <div className="space-y-0.5">
                                <div className="rowcashgame flex bg-slate-800 text-white">
                                    <div className="w-full flex gap-4 justify-between p-5 py-2 items-center text-sm">
                                        <div className="text-left w-6/12">
                                            Nombre
                                        </div>
                                        <div className="text-right w-2/12">
                                            Blinds
                                        </div>
                                        <div className="w-4/12 text-right">
                                            Min/Max
                                        </div>
                                    </div>
                                </div>
                                {cashgames.map((cashgame) => (
                                    <RowCashgame
                                        key={cashgame.id}
                                        cashgame={cashgame}
                                        casino={casino}
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
