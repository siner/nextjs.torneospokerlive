import { getTextColor } from '../../lib/utils'

export default function MiniRowTournament(props) {
    const { torneo } = props
    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)
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
            <div className="w-full flex gap-2 justify-between p-1 items-start">
                <div className="name w-full text-left text-xs">
                    <a href={'/torneos/' + torneo.id}>{torneo.name}</a>
                </div>
            </div>
        </div>
    )
}
