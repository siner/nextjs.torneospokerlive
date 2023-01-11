import DefaultTags from '../../defaultTags'
import { getEvent } from '../../../lib/notion'

export default async function Head({ params }) {
    const evento = await getEvent(params.slug)
    const title = `${evento.name} - Torneos Poker Live`
    return (
        <>
            <title>{title}</title>
            <DefaultTags />
        </>
    )
}
