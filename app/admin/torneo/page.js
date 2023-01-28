import EditTorneo from '../../../components/admin/EditTorneo'
import { getAllCasinos, getAllEvents } from '../../../lib/prisma'

export default async function Page() {
    const casinos = await getAllCasinos()
    const eventos = await getAllEvents()
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-full">
                    <EditTorneo casinos={casinos} eventos={eventos} />
                </div>
            </div>
        </main>
    )
}
