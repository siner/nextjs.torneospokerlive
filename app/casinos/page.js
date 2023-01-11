import CardCasino from '../../components/casino/CardCasino'
import { getAllCasinos } from '../../lib/notion'
export const revalidate = 60

export default async function Page() {
    const casinos = await getAllCasinos()

    return (
        <main className="mx-5">
            <h1 className="text-2xl font-bold py-4">Casinos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {casinos.map((casino) => (
                    <CardCasino key={casino.id} casino={casino} />
                ))}
            </div>
        </main>
    )
}
