import CardEvento from '../../../../../components/evento/CardEvento'
import {
    getAllCasinos,
    getTournament,
    getAllEvents,
    getCasinoById,
    getEventById,
} from '../../../../../lib/prisma'
import CardCasino from '../../../../../components/casino/CardCasino'
import CloneTorneo from '../../../../../components/admin/CloneTorneo'
import SuperJSON from 'superjson'

export default async function Page({ params }) {
    var torneo = await getTournament(params.slug)
    torneo = SuperJSON.parse(torneo)
    const casino = await getCasinoById(torneo.casinoId)
    var evento = null
    if (torneo.eventId) evento = await getEventById(torneo.eventId)

    const casinos = await getAllCasinos()
    const eventos = await getAllEvents()

    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="md:w-4/12 mt-6 space-y-4">
                    <CardCasino casino={casino} />
                    {evento && <CardEvento evento={evento} />}
                </div>
                <div className="md:w-8/12">
                    <CloneTorneo
                        currenttorneo={torneo}
                        casinos={casinos}
                        eventos={eventos}
                    />
                </div>
            </div>
        </main>
    )
}
