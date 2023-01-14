import Link from 'next/link'

export default function CardTour({ tour }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure className="h-32 md:h-40">
                <Link href={'/circuitos/' + tour.slug}>
                    <img
                        className="w-1/2 max-h-48 md:max-h-64 mx-auto object-cover"
                        src={tour.logo}
                        alt={tour.name}
                    />
                </Link>
            </figure>
            <div className="card-body items-center justify-center text-center padding p-4 md:p-8">
                <h2 className="card-title">
                    <Link
                        href={'/circuitos/' + tour.slug}
                        className="font-bold"
                    >
                        {tour.name}
                    </Link>
                </h2>
            </div>
        </div>
    )
}
