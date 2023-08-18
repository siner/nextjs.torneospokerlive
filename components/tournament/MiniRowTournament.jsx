import { getTextColor } from '../../lib/utils'
import Image from 'next/image'
export default function MiniRowTournament(props) {
    var { torneo, casino, event } = props
    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)
    let datetorneo = new Date(torneo.date)
    const hour = datetorneo.getHours()
    const minutes = datetorneo.getMinutes()
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
            <div className="w-full flex gap-2 justify-between p-1 items-start">
                <div className="name w-full text-left text-xs">
                    <a
                        href={'/torneos/' + torneo.slug}
                        className="flex justify-between items-center content-center"
                    >
                        <div className="flex justify-start content-center items-center">
                            {casino && (
                                <Image
                                    src={`https://wsrv.nl/?url=${torneo.casino.logo}&w=100&h=40&fit=contain`}
                                    width={100}
                                    height={40}
                                    alt={'Logo ' + torneo.casino.name}
                                    className="mr-2 w-8"
                                />
                            )}
                            {event && torneo.evento && (
                                <Image
                                    src={`https://wsrv.nl/?url=${torneo.evento.tour.logo}&w=100&h=100&fit=contain`}
                                    width={20}
                                    height={20}
                                    alt={'Icono ' + torneo.evento.name}
                                    className="mr-2 w-8"
                                />
                            )}
                            <span>{torneo.name}</span>
                        </div>
                        <span className="text-right">
                            {hour}:{String(minutes).padStart(2, '0')}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
