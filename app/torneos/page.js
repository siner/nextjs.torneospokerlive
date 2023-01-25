import RowTournamentV2 from '../../components/tournament/RowTournamentV2'

import { getNextTournaments } from '../../lib/prisma'
export const revalidate = 60

export default async function Page() {
    const torneos = await getNextTournaments()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
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
