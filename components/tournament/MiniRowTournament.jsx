import { formatDate, getTextColor } from '../../lib/utils'
import Link from 'next/link'
import Image from 'next/image'
export default function MiniRowTournament(props) {
    var { torneo, casino, event } = props
    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)
    let datetorneo = new Date(torneo.date)
    let { datestring, hour } = formatDate(datetorneo)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let opacity = datetorneo < today ? '0.7' : '1'

    const casinoname = torneo.casino.name ? torneo.casino.name : ''
    const eventoname = torneo.evento?.name ? '- ' + torneo.evento?.name : ''

    return (
        <div
            className="rowtournament shadow-lg mb-0.5 w-full"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                opacity: opacity,
            }}
        >
            <div className="flex gap-2 justify-between p-1 items-start">
                <div className="name w-full text-left text-xs">
                    <Link
                        href={'/torneos/' + torneo.slug}
                        className="flex justify-between items-center content-center"
                    >
                        <div className="text-left">{torneo.name}</div>
                        <div className="text-right">{hour}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
