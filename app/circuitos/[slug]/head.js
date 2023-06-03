import DefaultTags from '../../defaultTags'
import { getTour } from '../../../lib/prisma'

export default async function Head({ params }) {
    const circuito = await getTour(params.slug)
    var title = 'Circuito no encontrado - Torneos Poker Live'
    var description = `Circuito de poker ${circuito.name}`
    if (circuito.name) title = `${circuito.name} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta property="og:image" content={circuito.logo} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:image" content={circuito.logo} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />

            <DefaultTags />
        </>
    )
}
