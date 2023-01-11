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
                            <img
                                className="mr-4 w-24"
                                src={torneo.casino.logo}
                                alt={'Logo ' + torneo.casino.name}
                            />
                        </a>
                    </div>
                )}

                <div className="name w-8/12 flex items-center text-sm md:text-lg">
                    {event && torneo.events && (
                        <a href={'/eventos/' + torneo.event.slug}>
                            <img
                                className="mr-4 w-12 mb-1"
                                src={torneo.evento.circuito.logo}
                                alt={'Icono ' + torneo.evento.name}
                            />
                        </a>
                    )}
                    <a href={'/torneos/' + torneo.id}>{torneo.name}</a>
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
