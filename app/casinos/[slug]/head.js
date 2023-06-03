import DefaultTags from '../../defaultTags'
import { getCasino } from '../../../lib/prisma'

export default async function Head({ params }) {
    const casino = await getCasino(params.slug)
    var title = 'Casino no encontrado - Torneos Poker Live'
    var description = `Torneos de poker que se disputarán próximamente en el ${casino.name}`

    if (casino.name) title = `${casino.name} - Torneos Poker Live`

    return (
        <>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta property="og:image" content={casino.logo} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:image" content={casino.logo} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <DefaultTags />
        </>
    )
}
