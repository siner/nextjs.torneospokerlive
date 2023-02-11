import SuperJSON from 'superjson'
import RowEventoV2 from '../../../components/evento/RowEventoV2'
import { getPastEvents } from '../../../lib/prisma'
export const revalidate = 60

export default async function Page() {
    const pastevents = await getPastEvents()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Eventos live pasados</h2>
            <div className="space-y-0.5">
                {pastevents.map((event) => (
                    <RowEventoV2
                        key={SuperJSON.parse(event).id}
                        evento={event}
                        showtour={true}
                    />
                ))}
            </div>
        </main>
    )
}
