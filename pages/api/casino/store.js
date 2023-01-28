import { updateCasino, newCasino } from '../../../lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        if (body.casino.id) {
            const result = await updateCasino(body.casino.id, body.casino)
        } else {
            const result = await newCasino(body.casino)
        }
        res.status(200).json(body)
    }
}
