import DefaultTags from '../../defaultTags'
import { getEvent } from '../../../lib/prisma'

export default async function Head({ params }) {
    const evento = await getEvent(params.slug)
    var casino = ''
    if (evento.casino) {
        casino = evento.casino.name
    }
    var title = 'Evento no encontrado - Torneos Poker Live'
    if (evento.name) title = `${evento.name} ${casino} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
