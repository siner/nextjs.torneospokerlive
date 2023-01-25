import DefaultTags from '../../defaultTags'
import { getTournament } from '../../../lib/prisma'

export default async function Head({ params }) {
    const torneo = await getTournament(params.id)
    const title = `${torneo.name} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
