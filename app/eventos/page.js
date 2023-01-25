import CardEvento from '../../components/evento/CardEvento'
import RowEventoV2 from '../../components/evento/RowEventoV2'
import {
    getCurrentEvents,
    getNextEvents,
    getPastEvents,
} from '../../lib/prisma'
export const revalidate = 60

export default async function Page() {
    const currentevents = await getCurrentEvents()
    const nextevents = await getNextEvents()
    const pastevents = await getPastEvents()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Eventos live futuros</h2>
            <div className="space-y-0.5">
                {nextevents.map((event) => (
                    <RowEventoV2 key={event.id} evento={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentevents.map((event) => (
                    <CardEvento key={event.id} evento={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold py-4">Eventos live anteriores</h2>
            <div className="space-y-0.5">
                {pastevents.map((event) => (
                    <RowEventoV2 key={event.id} evento={event} />
                ))}
            </div>
        </main>
    )
}
