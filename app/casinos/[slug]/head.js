import DefaultTags from '../../defaultTags'
import { getCasino } from '../../../lib/prisma'

export default async function Head({ params }) {
    const casino = await getCasino(params.slug)
    var title = 'Casino no encontrado - Torneos Poker Live'
    if (casino.name) title = `${casino.name} - Torneos Poker Live`

    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
