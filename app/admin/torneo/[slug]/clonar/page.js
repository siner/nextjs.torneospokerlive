import CardEvento from '../../../../../components/evento/CardEvento'
import {
    getAllCasinos,
    getTournament,
    getAllEvents,
} from '../../../../../lib/prisma'
import CardCasino from '../../../../../components/casino/CardCasino'
import CloneTorneo from '../../../../../components/admin/CloneTorneo'

export default async function Page({ params }) {
    const torneo = await getTournament(params.slug)
    const casinos = await getAllCasinos()
    const eventos = await getAllEvents()

    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="md:w-4/12 mt-6 space-y-4">
                    <CardCasino casino={torneo.casino} />
                    {torneo.evento && <CardEvento evento={torneo.evento} />}
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
