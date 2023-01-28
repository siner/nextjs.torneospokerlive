import CardEvento from '../../../../components/evento/CardEvento'
import { getAllCasinos, getAllTours, getEvent } from '../../../../lib/prisma'
import EditEvento from '../../../../components/admin/EditEvento'

export default async function Page({ params }) {
    const evento = await getEvent(params.slug)
    const casinos = await getAllCasinos()
    const circuitos = await getAllTours()

    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-4/12 mt-6">
                    <CardEvento evento={evento} />
                </div>
                <div className="md:w-8/12">
                    <EditEvento
                        currentevento={evento}
                        casinos={casinos}
                        circuitos={circuitos}
                    />
                </div>
            </div>
        </main>
    )
}
