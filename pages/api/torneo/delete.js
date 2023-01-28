import { deleteTorneo } from '../../../lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const result = await deleteTorneo(body.torneo.id)
        res.status(200).json(result)
    }
}
