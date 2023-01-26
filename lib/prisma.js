import { PrismaClient } from '@prisma/client/edge'
export const prisma = new PrismaClient()

import { getTodayText } from './utils'

/* Metadatas */
const getTournamentMetaData = (tournament) => {
    return {
        id: tournament?.id,
        name: tournament?.name,
        slug: tournament?.slug,
        casino: tournament?.casino,
        casino_id: tournament?.casinoId,
        event_id: tournament?.eventId,
        evento: tournament?.event,
        date: tournament?.date,
        content: tournament?.content,
        price: tournament?.price,
    }
}
const getEventMetaData = (event) => {
    return {
        id: event?.id,
        name: event?.name,
        slug: event?.slug,
        casino: event?.casino,
        tour: event?.tour,
        casino_id: event?.casinoId,
        tour_id: event?.tourId,
        from: event?.from,
        to: event?.to,
    }
}
const getCasinoMetaData = (casino) => {
    return {
        id: casino?.id,
        name: casino?.name,
        slug: casino?.slug,
        logo: casino?.logo,
        color: casino?.color,
        content: casino?.content,
    }
}
const getTourMetaData = (tour) => {
    return {
        id: tour?.id,
        name: tour?.name,
        slug: tour?.slug,
        logo: tour?.logo,
    }
}

/* Events */
export const getCurrentEvents = async () => {
    var today = new Date()
    today.setHours(0, 0, 0)
    const events = await prisma.event.findMany({
        where: {
            from: {
                gte: today,
                lte: today,
            },
        },
        orderBy: [{ from: 'desc' }],
        include: {
            tour: true,
            casino: true,
        },
    })
    return events.map((event) => {
        return getEventMetaData(event)
    })
}

export const getNextEvents = async () => {
    var today = new Date()
    today.setHours(0, 0, 0)
    const events = await prisma.event.findMany({
        where: {
            from: {
                gt: today,
            },
        },
        orderBy: [{ from: 'desc' }],
        include: {
            tour: true,
            casino: true,
        },
    })
    return events.map((event) => {
        return getEventMetaData(event)
    })
}

export const getPastEvents = async () => {
    const events = await prisma.event.findMany({
        where: {
            from: {
                lt: new Date(),
            },
        },
        orderBy: [{ from: 'desc' }],
        include: {
            tour: true,
            casino: true,
        },
    })
    return events.map((event) => {
        return getEventMetaData(event)
    })
}

export const getAllEvents = async () => {
    const events = await prisma.event.findMany({
        orderBy: [{ from: 'desc' }],
        include: {
            tour: true,
            casino: true,
        },
    })
    return events.map((event) => {
        return getEventMetaData(event)
    })
}

export const getAllEventsByTour = async (tour_id) => {
    const events = await prisma.event.findMany({
        where: {
            tourId: tour_id,
        },
        orderBy: [{ from: 'desc' }],
        include: {
            tour: true,
            casino: true,
        },
    })
    return events.map((event) => {
        return getEventMetaData(event)
    })
}

export const getEvent = async (slug) => {
    const events = await prisma.event.findMany({
        where: {
            slug: slug,
        },
        include: {
            tour: true,
            casino: true,
        },
    })
    return getEventMetaData(events[0])
}

export const getEventById = async (id) => {
    const event = await prisma.event.findUnique({
        where: {
            id: id,
        },
        include: {
            tour: true,
            casino: true,
        },
    })
    return getEventMetaData(event)
}

export const getAllCasinos = async () => {
    const casinos = await prisma.casino.findMany({
        orderBy: [{ name: 'asc' }],
    })
    return casinos.map((casino) => {
        return getCasinoMetaData(casino)
    })
}
export const getCasino = async (slug) => {
    const casinos = await prisma.casino.findMany({
        where: {
            slug: slug,
        },
    })
    return getCasinoMetaData(casinos[0])
}
export const getCasinoById = async (id) => {
    const casino = await prisma.casino.findUnique({
        where: {
            id: id,
        },
    })
    return getCasinoMetaData(casino)
}

export const getAllTours = async () => {
    const tours = await prisma.tour.findMany({
        orderBy: [{ name: 'asc' }],
    })
    return tours.map((tour) => {
        return getTourMetaData(tour)
    })
}
export const getTour = async (slug) => {
    const tours = await prisma.tour.findMany({
        where: {
            slug: slug,
        },
    })
    return getTourMetaData(tours[0])
}

export const getAllTournaments = async () => {
    const tournaments = await prisma.tournament.findMany({
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}
export const getAllTournamentsByCasino = async (casino_id) => {
    const tournaments = await prisma.tournament.findMany({
        where: {
            casinoId: casino_id,
        },
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}

export const getNextTournamentsByCasino = async (casino_id) => {
    var today = new Date()
    today.setHours(0, 0, 0)
    const tournaments = await prisma.tournament.findMany({
        where: {
            casinoId: casino_id,
            date: {
                gte: today,
            },
        },
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}

export const getAllTournamentsByEvent = async (event_id) => {
    const tournaments = await prisma.tournament.findMany({
        where: {
            eventId: event_id,
        },
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}

export const getNextTournaments = async () => {
    var today = new Date()
    today.setHours(0, 0, 0)
    const tournaments = await prisma.tournament.findMany({
        where: {
            date: {
                gte: today,
            },
        },
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}

export const getTodayTournaments = async () => {
    var today = new Date()
    var tomorrow = new Date()
    today.setHours(0, 0, 0)
    tomorrow.setHours(23, 59, 59)
    const tournaments = await prisma.tournament.findMany({
        where: {
            date: {
                gte: today,
                lte: tomorrow,
            },
        },
        orderBy: [{ date: 'asc' }],
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return tournaments.map((tournament) => {
        return getTournamentMetaData(tournament)
    })
}

export const getTournament = async (slug) => {
    const tournaments = await prisma.tournament.findMany({
        where: {
            slug: slug,
        },
        include: {
            casino: true,
            event: {
                include: {
                    tour: true,
                },
            },
        },
    })
    return getTournamentMetaData(tournaments[0])
}
