import DefaultTags from '../../defaultTags'
import { getEvent } from '../../../lib/prisma'
import { getSimpleDate } from '../../../lib/utils'

export default async function Head({ params }) {
    var evento = await getEvent(params.slug)
    let datestringfrom = getSimpleDate(evento.from)
    let datestringto = getSimpleDate(evento.to)

    var casino = ''
    if (evento.casino) {
        casino = evento.casino.name
    }
    var title = 'Evento no encontrado - Torneos Poker Live'
    var description = `Evento de poker del circuito ${evento.tour.name} en el ${casino} del ${datestringfrom} al ${datestringto}`
    if (evento.name) title = `${evento.name} ${casino} - Torneos Poker Live`

    return (
        <>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta property="og:image" content={evento.tour.logo} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:image" content={evento.tour.logo} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />

            <DefaultTags />
        </>
    )
}
