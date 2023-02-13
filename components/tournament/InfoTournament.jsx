import Image from 'next/image'
import { localeDateString, getTextColor } from '../../lib/utils'

export default function InfoTournament(props) {
    const { torneo } = props

    const backgroundColor = torneo.casinos.color
    const textColor = getTextColor(backgroundColor)

    const date = new Date(torneo.date)

    return (
        <div
            className="w-100 flex justify-between p-5 items-center"
            style={{ backgroundColor: backgroundColor, color: textColor }}
        >
            <div className="flex gap-10 items-center">
                <div className="casino">
                    <a href={'/casinos/' + torneo.casino.slug}>
                        <Image
                            className="mx-auto"
                            src={`https://wsrv.nl/?url=${torneo.casino.logo}&w=80&h=80&fit=contain`}
                            width={80}
                            height={80}
                            alt={torneo.casino.name}
                        />
                    </a>
                </div>
                <div className="flex flex-col text-xs w-60">
                    <div>{torneo.casino.name}</div>
                    <div>{localeDateString(date)}</div>
                    <div>
                        <strong>{torneo.hour}</strong>
                    </div>
                </div>
                <div className="name">
                    <a href={'/torneos/' + torneo.slug}>{torneo.name}</a>
                </div>
            </div>
            {torneo.price && torneo.price > 0 && (
                <div className="price font-bold">{torneo.price}€</div>
            )}
        </div>
    )
}
