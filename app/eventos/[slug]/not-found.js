import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="grid place-items-center pt-10">
            <h2 className="text-2xl font-bold py-4">Evento no encontrado</h2>
            <div className="text-center mt-4 space-x-4">
                <Link className="btn" href="/">
                    Volver al inicio
                </Link>
                <Link className="btn" href="/eventos">
                    Todos los Eventos
                </Link>
            </div>
        </div>
    )
}
