import ReactMarkdown from 'react-markdown'
import CardCasino from '../../../components/casino/CardCasino'
import CardEvento from '../../../components/evento/CardEvento'
import { notFound } from 'next/navigation'
import { getTextColor, formatDate } from '../../../lib/utils'
import {
    getCasinoById,
    getEventById,
    getTournament,
    getNextTournaments,
} from '../../../lib/prisma'
export const revalidate = 60

export default async function Page({ params }) {
    var torneo = await getTournament(params.slug)

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
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: casino.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: '',
                postalCode: '',
                addressRegion: '',
                addressCountry: '',
            },
        },
        name: torneo.name,
        description:
            'Torneo de poker ' + torneo.name + ' en el casino ' + casino.name,
        organizer: {
            '@type': 'Organization',
            name: casino.name,
        },
        image: [casino.logo],
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
    const tournaments = await getNextTournaments()

    return tournaments.map((tournament) => ({
        slug: tournament.slug,
    }))
}
