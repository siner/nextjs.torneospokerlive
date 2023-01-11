export default function CardTour({ tour }) {
    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="text-center p-8 bg-slate-300 hover:bg-slate-400 block relative">
                <a href={'/circuitos/' + tour.slug}>
                    <img
                        className="mx-auto h-14"
                        src={tour.logo}
                        alt={tour.name}
                    />
                </a>
            </div>
            <div className="px-6 py-4 text-center">
                <a href={'/circuitos/' + tour.slug} className="font-bold mb-2">
                    {tour.name}
                </a>
            </div>
        </div>
    )
}
