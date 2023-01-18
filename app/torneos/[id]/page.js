export const revalidate = 60

import ReactMarkdown from 'react-markdown'
import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import { getTextColor, formatDate } from '../../../lib/utils'
import {
    getCasinoById,
    getEvent,
    getEventById,
    getNextTournaments,
    getTournament,
    notion,
} from '../../../lib/notion'
import { NotionToMarkdown } from 'notion-to-md'

export default async function Page({ params }) {
    const n2m = new NotionToMarkdown({ notionClient: notion })
    const torneo = await getTournament(params.id)
    const casino = await getCasinoById(torneo.casino_id)
    var event = null
    if (torneo.event_id) event = await getEventById(torneo.event_id)
    let backgroundColor = '#ffffff'
    if (casino) backgroundColor = casino.color
    const textColor = getTextColor(backgroundColor)
    let { datestring, hour } = formatDate(torneo.date)
    const mdblocks = await n2m.pageToMarkdown(torneo.id)
    const mdString = n2m.toMarkdownString(mdblocks)

    return (
        <main className="md:flex gap-4 space-y-4 md:space-y-0 mx-5 mt-10">
            <div className="md:w-8/12">
                <div
                    className="text-2xl font-bold flex justify-between items-center p-5"
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                    }}
                >
                    <div className="flex flex-col items-left md:flex-row md:items-center w-2/3">
                        {torneo.name}
                    </div>
                    {torneo.price && torneo.price > 0 && (
                        <div className="text-4xl font-bold w-1/3 text-right">
                            {torneo.price}€
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <div className="font-bold">
                        {datestring} - {hour}
                    </div>
                    {torneo.description && (
                        <div className="mt-6">{torneo.description}</div>
                    )}
                </div>
                {mdString && (
                    <div className="p-5">
                        <ReactMarkdown>{mdString}</ReactMarkdown>
                    </div>
                )}
            </div>
            <div className="md:w-4/12 space-y-4">
                {event && <CardEvento evento={event} />}
                {casino && <CardCasino casino={casino} />}
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const tournaments = await getNextTournaments()

    return tournaments.map((tournament) => ({
        id: tournament.id,
    }))
}
