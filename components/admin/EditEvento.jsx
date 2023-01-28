'use client'

import Spinner from '../elements/Spinner'
import { useState } from 'react'
import { getDateText } from '../../lib/utils'

export default function EditEvento(props) {
    const { casinos, circuitos, currentevento } = props
    const casino = currentevento?.casino
    const circuito = currentevento?.tour

    const [evento, setEvento] = useState({
        id: currentevento?.id,
        name: currentevento?.name,
        casinoId: currentevento?.casinoId,
        tourId: currentevento?.tourId,
        slug: currentevento?.slug,
        from: currentevento?.from,
        to: currentevento?.to,
    })

    console.log(evento)

    const [status, setStatus] = useState({
        error: '',
        success: false,
        isLoading: false,
    })

    const handleChange = (event) => {
        setEvento({
            ...evento,
            [event.target.name]: event.target.value,
        })
        console.log(evento)
    }

    const handleSave = async () => {
        setStatus({ error: '', success: false, isLoading: true })

        const data = {
            evento: evento,
        }
        const response = await fetch('/api/evento/store', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        setStatus({ error: '', success: true, isLoading: false })
    }

    return (
        <div className="w-full mt-10">
            <div>
                <form
                    onSubmit={handleSave}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            value={evento.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="slug"
                        >
                            Slug
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="slug"
                            value={evento.slug}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="casino"
                        >
                            Circuito
                        </label>
                        <div className="relative">
                            <select
                                className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="tourId"
                                onChange={handleChange}
                                defaultValue={circuito?.id}
                            >
                                {circuitos?.map((circuito) => (
                                    <option
                                        key={circuito.id}
                                        value={circuito.id}
                                    >
                                        {circuito.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="casino"
                        >
                            Casino
                        </label>
                        <div className="relative">
                            <select
                                className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="casinoId"
                                onChange={handleChange}
                                defaultValue={casino?.id}
                            >
                                {casinos?.map((casino) => (
                                    <option key={casino.id} value={casino.id}>
                                        {casino.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="mb-4 w-1/2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="from"
                            >
                                Fecha Inicio
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                name="from"
                                value={getDateText(evento.from)}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="to"
                            >
                                Fecha Fin
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                name="to"
                                value={getDateText(evento.to)}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button
                        disabled={status.isLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSave}
                    >
                        {status.isLoading && <Spinner />} Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}
