import RowTournamentV2 from '../../../components/tournament/RowTournamentV2'

import { getTodayTournaments } from '../../../lib/prisma'
export const revalidate = 0

export default async function Page() {
    const torneos = await getTodayTournaments()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Torneos de hoy</h2>
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
