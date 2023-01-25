import DefaultTags from '../../defaultTags'
import { getTour } from '../../../lib/prisma'

export default async function Head({ params }) {
    const circuito = await getTour(params.slug)
    const title = `${circuito.name} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
