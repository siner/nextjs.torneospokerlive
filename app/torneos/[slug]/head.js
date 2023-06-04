import DefaultTags from '../../defaultTags'
import { getTournament } from '../../../lib/prisma'
import { localeDateString } from '../../../lib/utils'

export default async function Head({ params }) {
    var torneo = await getTournament(params.slug)

    var description = ''
    var casino = ''
    if (torneo.casino) {
        casino = torneo.casino.name
    }
    var title = 'Torneo no encontrado - Torneos Poker Live'
    if (torneo.id) {
        let date = localeDateString(torneo.date)
        description = `Torneo de poker ${torneo.name} en el ${casino} el ${date}`
    }

    if (torneo.name) title = `${torneo.name} ${casino} - Torneos Poker Live`

    return (
        <>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta
                property="og:image"
                content="https://torneospokerlive.com/logo.png"
            />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="twitter:image"
                content="https://torneospokerlive.com/logo.png"
            />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <DefaultTags />
        </>
    )
}
