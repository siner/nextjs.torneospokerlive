/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'

export default function CardCasino({ casino }) {
    const bg = casino.color

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure className="h-32 md:h-40" style={{ backgroundColor: bg }}>
                <Link href={'/casinos/' + casino.slug}>
                    <Image
                        className="mx-auto"
                        src={`https://wsrv.nl/?url=${casino.logo}&w=200&h=150&fit=contain`}
                        width={200}
                        height={150}
                        alt={casino.name}
                    />
                </Link>
            </figure>
            <div className="card-body items-center justify-center text-center p-4 md:p-8">
                <h2 className="card-title">
                    <Link href={'/casinos/' + casino.slug}>{casino.name}</Link>
                </h2>
            </div>
        </div>
    )
}
