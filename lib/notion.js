const { Client } = require('@notionhq/client')

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

import { getTodayText } from './utils'

function createFormatFactory(current, prev, next) {
    return (key, startToken, endToken = startToken) => {
        const pre = current[key] && !prev?.[key] ? startToken : ''
        const post = current[key] && !next?.[key] ? endToken : ''

        return (content) => `${pre}${content}${post}`
    }
}

function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x)
}

const annotations = { italic: true }
const previousAnnotations = { italic: false }
const nextAnnotations = { italic: false }
const formatFromAnnotations = createFormatFactory(
    annotations,
    previousAnnotations,
    nextAnnotations
)

function formatRichText(richTextObjects = []) {
    return richTextObjects
        .map(({ type, [type]: config, annotations }, i) => {
            if (type !== 'text') return '' // TODO: support `mention` and `equation`

            const prev = richTextObjects[i - 1]
            const next = richTextObjects[i + 1]

            const formatFromConfig = createFormatFactory(
                config,
                prev?.[prev?.type],
                next?.[next?.type]
            )
            const formatFromAnnotations = createFormatFactory(
                annotations,
                prev?.annotations,
                next?.annotations
            )

            const link = formatFromConfig('link', '[', `](${config.link?.url})`)
            const bold = formatFromAnnotations('bold', '**')
            const italic = formatFromAnnotations('italic', '*')
            const strikethrough = formatFromAnnotations('strikethrough', '~~')
            const underline = formatFromAnnotations('underline', '') // no-op for Markdown
            const code = formatFromAnnotations('code', '`')

            const formatter = compose(
                link,
                bold,
                italic,
                strikethrough,
                underline,
                code
            )

            return formatter(config.content)
        })
        .join('')
}

/* Metadatas */
const getTournamentMetaData = (tournament, casinos = [], events = []) => {
    const casino_id = tournament.properties.casino.relation.length
        ? tournament.properties.casino.relation[0].id
        : null

    const event_id = tournament.properties.event.relation.length
        ? tournament.properties.event.relation[0].id
        : null

    return {
        id: tournament.id,
        name: tournament.properties.name.title[0].plain_text,
        casino: casinos.find((x) => x.id == casino_id),
        casino_id: casino_id,
        event_id: event_id,
        evento: events.find((x) => x.id == event_id),
        date: tournament.properties.date.date.start,
        hour: tournament.properties.hour.rich_text[0]?.plain_text,
        description: tournament.properties.description.rich_text[0]?.plain_text,
        price: tournament.properties.price.number,
        url: tournament.url,
        created_at: tournament.properties.created_at.created_time,
        updated_at: tournament.properties.updated_at.last_edited_time,
    }
}
const getEventMetaData = (event, casinos = [], tours = []) => {
    const casino_id = event.properties.casino.relation.length
        ? event.properties.casino.relation[0].id
        : null

    const tour_id = event.properties.tour.relation.length
        ? event.properties.tour.relation[0].id
        : null
    return {
        id: event.id,
        name: event.properties.name.title[0].plain_text,
        slug: event.properties.slug.rich_text[0].plain_text,
        casino: casinos.find((x) => x.id == casino_id),
        tour: tours.find((x) => x.id == tour_id),
        casino_id: casino_id,
        tour_id: tour_id,
        from: event.properties.from.date.start,
        to: event.properties.to.date.start,
        created_at: event.properties.created_at.created_time,
        updated_at: event.properties.updated_at.last_edited_time,
    }
}
const getCasinoMetaData = (casino) => {
    return {
        id: casino.id,
        name: casino.properties.name.title[0].plain_text,
        slug: casino.properties.slug.rich_text[0].plain_text,
        address: casino.properties.address.rich_text[0].plain_text,
        logo: casino.properties.logo.url,
        url: casino.properties.url.url,
        color: casino.properties.color.rich_text[0].plain_text,
    }
}
const getTourMetaData = (tour) => {
    return {
        id: tour.id,
        name: tour.properties.name.title[0].plain_text,
        slug: tour.properties.slug.rich_text[0].plain_text,
        logo: tour.properties.logo.url,
    }
}

/* Events */
export const getCurrentEvents = async () => {
    const events = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        sorts: [
            {
                property: 'from',
                direction: 'ascending',
            },
        ],
        filter: {
            and: [
                {
                    property: 'from',
                    date: {
                        on_or_before: getTodayText(),
                    },
                },
                {
                    property: 'to',
                    date: {
                        on_or_after: getTodayText(),
                    },
                },
            ],
        },
    })

    const allEvents = events.results
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return allEvents.map((event) => {
        return getEventMetaData(event, casinos, tours)
    })
}
export const getNextEvents = async () => {
    const events = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        sorts: [
            {
                property: 'from',
                direction: 'descending',
            },
        ],
        filter: {
            property: 'from',
            date: {
                after: getTodayText(),
            },
        },
    })

    const allEvents = events.results
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return allEvents.map((event) => {
        return getEventMetaData(event, casinos, tours)
    })
}
export const getPastEvents = async () => {
    const events = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        sorts: [
            {
                property: 'from',
                direction: 'descending',
            },
        ],
        filter: {
            property: 'to',
            date: {
                before: getTodayText(),
            },
        },
    })

    const allEvents = events.results
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return allEvents.map((event) => {
        return getEventMetaData(event, casinos, tours)
    })
}
export const getAllEvents = async () => {
    const events = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        sorts: [
            {
                property: 'from',
                direction: 'ascending',
            },
        ],
    })

    const allEvents = events.results
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return allEvents.map((event) => {
        return getEventMetaData(event, casinos, tours)
    })
}
export const getAllEventsByTour = async (tour_id) => {
    const events = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        sorts: [
            {
                property: 'from',
                direction: 'descending',
            },
        ],
        filter: {
            property: 'tour',
            relation: {
                contains: tour_id,
            },
        },
    })

    const allEvents = events.results
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return allEvents.map((event) => {
        return getEventMetaData(event, casinos, tours)
    })
}
export const getEvent = async (slug) => {
    const response = await notion.databases.query({
        database_id: process.env.EVENTS_DATABASE_ID,
        filter: {
            property: 'slug',
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    })

    const event = response.results[0]
    const casinos = await getAllCasinos()
    const tours = await getAllTours()

    return getEventMetaData(event, casinos, tours)
}

export const getEventById = async (id) => {
    const response = await notion.pages.retrieve({
        page_id: id,
    })
    const casinos = await getAllCasinos()
    const tours = await getAllTours()
    return getEventMetaData(response, casinos, tours)
}

/* Casinos */
export const getAllCasinos = async () => {
    const casinos = await notion.databases.query({
        database_id: process.env.CASINOS_DATABASE_ID,
        sorts: [
            {
                property: 'name',
                direction: 'ascending',
            },
        ],
    })

    const allCasinos = casinos.results

    return allCasinos.map((casino) => {
        return getCasinoMetaData(casino)
    })
}
export const getCasino = async (slug) => {
    const response = await notion.databases.query({
        database_id: process.env.CASINOS_DATABASE_ID,
        filter: {
            property: 'slug',
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    })

    const casino = response.results[0]

    return getCasinoMetaData(casino)
}
export const getCasinoById = async (id) => {
    const response = await notion.pages.retrieve({
        page_id: id,
    })

    return getCasinoMetaData(response)
}
/* Tours */
export const getAllTours = async () => {
    const tours = await notion.databases.query({
        database_id: process.env.TOURS_DATABASE_ID,
        sorts: [
            {
                property: 'name',
                direction: 'ascending',
            },
        ],
    })

    const allTours = tours.results

    return allTours.map((tour) => {
        return getTourMetaData(tour)
    })
}
export const getTour = async (slug) => {
    const response = await notion.databases.query({
        database_id: process.env.TOURS_DATABASE_ID,
        filter: {
            property: 'slug',
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    })

    const tour = response.results[0]

    return getTourMetaData(tour)
}

/* Tournaments */
export const getAllTournaments = async () => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}
export const getAllTournamentsByCasino = async (casino_id) => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
        filter: {
            property: 'casino',
            relation: {
                contains: casino_id,
            },
        },
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}
export const getNextTournamentsByCasino = async (casino_id) => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
        filter: {
            and: [
                {
                    property: 'casino',
                    relation: {
                        contains: casino_id,
                    },
                },
                {
                    property: 'date',
                    date: {
                        on_or_after: getTodayText(),
                    },
                },
            ],
        },
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}
export const getAllTournamentsByEvent = async (event_id) => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
        filter: {
            property: 'event',
            relation: {
                contains: event_id,
            },
        },
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}
export const getNextTournaments = async () => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
        filter: {
            property: 'date',
            date: {
                on_or_after: getTodayText(),
            },
        },
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}
export const getTodayTournaments = async () => {
    const tournaments = await notion.databases.query({
        database_id: process.env.TOURNAMENTS_DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
        filter: {
            and: [
                {
                    property: 'date',
                    date: {
                        on_or_before: getTodayText(),
                    },
                },
                {
                    property: 'date',
                    date: {
                        on_or_after: getTodayText(),
                    },
                },
            ],
        },
    })

    const allTournaments = tournaments.results
    const casinos = await getAllCasinos()
    const events = await getAllEvents()

    return allTournaments.map((tournament) => {
        return getTournamentMetaData(tournament, casinos, events)
    })
}

export const getTournament = async (id) => {
    const response = await notion.pages.retrieve({
        page_id: id,
    })

    const tournament = response

    return getTournamentMetaData(tournament)
}
