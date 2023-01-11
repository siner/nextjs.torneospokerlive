import DefaultTags from '../../defaultTags'
import { getCasino } from '../../../lib/notion'
export const revalidate = 60

export default async function Head({ params }) {
    const casino = await getCasino(params.slug)
    const title = `${casino.name} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
