import { updateTorneo, newTorneo } from '../../../lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        var result = null
        body.torneo.date = new Date(body.torneo.date)
        console.log(body)
        if (body.torneo.id) {
            result = await updateTorneo(body.torneo.id, body.torneo)
        } else {
            result = await newTorneo(body.torneo)
        }
        res.status(200).json(result)
    }
}
