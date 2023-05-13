export const revalidate = 60

import ReactMarkdown from 'react-markdown'
import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import { notFound } from 'next/navigation'
import { getTextColor, formatDate } from '../../../lib/utils'
import {
    getCasinoById,
    getEventById,
    getTodayTournaments,
    getTournament,
} from '../../../lib/prisma'
import Link from 'next/link'
import SuperJSON from 'superjson'

export default async function Page({ params }) {
    const env = process.env.NODE_ENV

    var torneo = await getTournament(params.slug)
    torneo = SuperJSON.parse(torneo)

    if (!torneo.id) {
        notFound()
    }
    const casino = await getCasinoById(torneo.casinoId)
    var event = null
    if (torneo.eventId) event = await getEventById(torneo.eventId)
    let backgroundColor = '#ffffff'
    if (casino) backgroundColor = casino.color
    const textColor = getTextColor(backgroundColor)
    let { datestring, hour } = formatDate(torneo.date)

    /** @type {import('schema-dts').Event} */
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        location: {
            '@type': 'Place',
            name: casino.name,
        },
        name: torneo.name,
        description:
            'Torneo de poker ' + torneo.name + ' en el casino ' + casino.name,
        startDate: torneo.date,
    }
    return (
        <main className="md:flex gap-4 space-y-4 md:space-y-0 mx-5 mt-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
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
                    {torneo.content && (
                        <div className="mt-6">
                            <ReactMarkdown>{torneo.content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
            <div className="md:w-4/12 space-y-4">
                {event && <CardEvento evento={event} />}
                {casino && <CardCasino casino={casino} />}
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const tournaments = await getTodayTournaments()

    return tournaments.map((tournament) => ({
        slug: SuperJSON.parse(tournament).slug,
    }))
}
