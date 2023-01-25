import slugify from 'slugify'
import { getAllTournaments, notion } from '../../lib/notion'
import { prisma, getTournament } from '../../lib/prisma'
import { NotionToMarkdown } from 'notion-to-md'
const n2m = new NotionToMarkdown({ notionClient: notion })

export default async function handler(req, res) {
    const tournaments = await getAllTournaments()
    var slugs = []
    tournaments.forEach(async (tournament) => {
        const date = new Date(tournament.date)

        var slug = slugify(
            date.toISOString().substring(0, 10) +
                ' ' +
                tournament.casino.name +
                ' ' +
                tournament.name,
            { lower: true, remove: /[*+~.()'"!:@]/g }
        )
        slugs.push(slug)
        const prismatournament = await getTournament(slug)

        const mdblocks = await n2m.pageToMarkdown(tournament.id)
        const mdString = n2m.toMarkdownString(mdblocks)

        if (prismatournament.id) {
            const update = await prisma.tournament.update({
                where: {
                    id: prismatournament.id,
                },
                data: {
                    content: mdString,
                },
            })
        }
    })
    res.status(200).json(slugs)
}
