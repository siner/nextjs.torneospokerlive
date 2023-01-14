import CardTour from '../../components/tour/CardTour'
import { getAllTours } from '../../lib/notion'
export const revalidate = 60

export default async function Page() {
    const tours = await getAllTours()

    return (
        <main className="mx-5">
            <h1 className="text-2xl font-bold py-4">Circuitos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tours.map((tour) => (
                    <CardTour key={tour.id} tour={tour} />
                ))}
            </div>
        </main>
    )
}
