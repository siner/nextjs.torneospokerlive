import DefaultTags from '../../defaultTags'
import { getTournament } from '../../../lib/prisma'

export default async function Head({ params }) {
    var torneo = await getTournament(params.slug)

    var casino = ''
    if (torneo.casino) {
        casino = torneo.casino.name
    }
    var title = 'Torneo no encontrado - Torneos Poker Live'
    if (torneo.name) title = `${torneo.name} ${casino} - Torneos Poker Live`

    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
