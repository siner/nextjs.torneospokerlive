import Image from 'next/image'
import { formatDate, getMobileDate, getTextColor } from '../../lib/utils'

export default function RowTournament(props) {
    const { torneo, casino, event } = props
    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)
    let date = torneo.date
    if (torneo.hour) date = torneo.date + ' ' + torneo.hour
    let { datestring, hour } = formatDate(date)
    let datetorneo = new Date(torneo.date)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let opacity = datetorneo < today ? '0.7' : '1'

    return (
        <div
            className="rowtournament shadow-lg"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                opacity: opacity,
            }}
        >
            <div className="text-xs mx-2 pt-1 mb-2 flex justify-between">
                {casino && <div className="casino">{torneo.casino.name}</div>}
                <div className="font-bold text-right grow">
                    {datestring} - {hour}
                </div>
            </div>
            <div className="w-full flex gap-4 justify-between p-2 pt-0 md:pt-2 items-center space-x-1">
                {casino && (
                    <div className="casino hidden md:inline text-xs w-2/12 md:w-1/12 ml-2 mb-2">
                        <a href={'/casinos/' + torneo.casino.slug}>
                            <Image
                                src={`https://wsrv.nl/?url=${torneo.casino.logo}&w=100&h=40&fit=contain`}
                                width={100}
                                height={40}
                                alt={'Logo ' + torneo.casino.name}
                                className="mx-auto"
                            />
                        </a>
                    </div>
                )}

                <div className="name w-8/12 flex items-center text-sm md:text-lg">
                    {event && torneo.evento && (
                        <a href={'/eventos/' + torneo.evento.slug}>
                            <Image
                                src={`https://wsrv.nl/?url=${torneo.evento.tour.logo}&w=100&h=100&fit=contain`}
                                width={100}
                                height={100}
                                alt={'Icono ' + torneo.evento.name}
                                className="mx-auto"
                            />
                        </a>
                    )}
                    <a href={'/torneos/' + torneo.slug}>{torneo.name}</a>
                </div>

                <div className="price font-bold text-xl md:text-2xl w-2/12 text-right">
                    <p>
                        {torneo.price && torneo.price > 0 && (
                            <span>{torneo.price}€</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
