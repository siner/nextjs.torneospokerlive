import CardEvento from '../../components/evento/CardEvento'
import RowEvento from '../../components/evento/RowEvento'
import {
    getCurrentEvents,
    getNextEvents,
    getPastEvents,
} from '../../lib/notion'
export const revalidate = 60

export default async function Page() {
    const currentevents = await getCurrentEvents()
    const nextevents = await getNextEvents()
    const pastevents = await getPastEvents()

    return (
        <main className="mx-5">
            <h2 className="text-2xl font-bold py-4">Eventos live actuales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentevents.map((event) => (
                    <CardEvento key={event.id} evento={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold py-4">Eventos live futuros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                {nextevents.map((event) => (
                    <CardEvento key={event.id} evento={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold py-4">Eventos live anteriores</h2>
            <div className="space-y-0.5">
                {pastevents.map((event) => (
                    <RowEvento key={event.id} evento={event} />
                ))}
            </div>
        </main>
    )
}
