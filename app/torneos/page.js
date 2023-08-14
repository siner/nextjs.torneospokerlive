import RowTournamentV2 from '../../components/tournament/RowTournamentV2'
import Calendar from '../../components/calendar/Calendar'
import { getNextTournaments2 } from '../../lib/prisma'
export const revalidate = 60

export default async function Page() {
    const torneos = await getNextTournaments2()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
            <div className="w-full hidden lg:block mb-5">
                <Calendar torneos={torneos} casino={true} event={true} />
            </div>

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
        </main>
    )
}
