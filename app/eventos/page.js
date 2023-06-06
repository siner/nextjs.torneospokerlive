import Link from 'next/link'
import CardEvento from '../../components/evento/CardEvento'
import RowEventoV2 from '../../components/evento/RowEventoV2'
import { getCurrentEvents, getNextEvents } from '../../lib/prisma'
export const revalidate = 0

export default async function Page() {
    const currentevents = await getCurrentEvents()
    const nextevents = await getNextEvents()

    return (
        <main className="mx-5">
            {currentevents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold py-4">
                        Eventos live actuales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {currentevents.map((event) => (
                            <CardEvento key={event.id} evento={event} />
                        ))}
                    </div>
                </div>
            )}

            {nextevents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold py-4">
                        Próximos eventos live
                    </h2>
                    <div className="space-y-0.5">
                        {nextevents.map((event) => (
                            <RowEventoV2
                                key={event.id}
                                evento={event}
                                showtour={true}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-10">
                <Link className="btn" href="/eventos/pasados">
                    Ver eventos pasados
                </Link>
            </div>
        </main>
    )
}
