import EditEvento from '../../../components/admin/EditEvento'
import { getAllCasinos, getAllTours } from '../../../lib/prisma'

export default async function Page() {
    const casinos = await getAllCasinos()
    const circuitos = await getAllTours()
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-full">
                    <EditEvento casinos={casinos} circuitos={circuitos} />
                </div>
            </div>
        </main>
    )
}
