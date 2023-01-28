import { updateTorneo, newTorneo } from '../../../lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        var result = null
        var date = new Date(body.torneo.date)
        date.setHours(date.getHours() + 1)
        body.torneo.date = date
        result = await newTorneo(body.torneo)
        res.status(200).json(result)
    }
}
