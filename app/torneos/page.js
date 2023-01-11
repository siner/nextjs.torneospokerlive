import RowTournament from '../../components/tournament/RowTournament'

import { getNextTournaments } from '../../lib/notion'
export const revalidate = 60

export default async function Page() {
    const torneos = await getNextTournaments()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
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
        </main>
    )
}
