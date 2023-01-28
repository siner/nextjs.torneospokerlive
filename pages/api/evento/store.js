import { updateEvento, newEvento } from '../../../lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        var result = null
        body.evento.from = new Date(body.evento.from)
        body.evento.to = new Date(body.evento.to)
        if (body.evento.id) {
            result = await updateEvento(body.evento.id, body.evento)
        } else {
            result = await newEvento(body.evento)
        }
        res.status(200).json(result)
    }
}
