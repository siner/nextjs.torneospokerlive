'use client'

import Spinner from '../elements/Spinner'
import { useState } from 'react'
import slugify from 'slugify'
import SuperJSON from 'superjson'

export default function EditTorneo({ currenttorneo, casinos, eventos }) {
    const casino = currenttorneo?.casino
    const evento = currenttorneo?.evento
    const [torneo, setTorneo] = useState({
        id: currenttorneo?.id,
        name: currenttorneo?.name,
        slug: currenttorneo?.slug,
        casinoId: currenttorneo?.casinoId,
        eventId: currenttorneo?.eventId,
        date: new Date(currenttorneo?.date).toISOString().slice(0, -1),
        price: currenttorneo?.price,
        content: currenttorneo?.content,
    })

    const [status, setStatus] = useState({
        error: '',
        success: false,
        isLoading: false,
    })

    const handleChange = (event) => {
        setTorneo({
            ...torneo,
            [event.target.name]: event.target.value,
            slug: slugify(
                torneo.date.substring(0, 10) +
                    ' ' +
                    casinos.find((x) => x.id == torneo.casinoId).name +
                    ' ' +
                    torneo.name,
                {
                    lower: true,
                    remove: /[*+~.()\[\]'"!:@]/g,
                }
            ),
        })
    }

    const handleSave = async () => {
        setStatus({ error: '', success: false, isLoading: true })

        const data = {
            torneo: torneo,
        }
        const response = await fetch('/api/torneo/clone', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        setStatus({ error: '', success: true, isLoading: false })
    }

    return (
        <div className="w-full mt-10">
            <div>
                <form onSubmit={handleSave} className="px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">Clonar torneo</h2>
                    </div>
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
                            value={torneo.name}
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
                            value={torneo.slug}
                            onChange={handleChange}
                            disabled
                        />
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
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="evento"
                        >
                            Evento
                        </label>
                        <div className="relative">
                            <select
                                className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="eventId"
                                onChange={handleChange}
                                defaultValue={evento?.id}
                            >
                                <option value="">--</option>
                                {eventos?.map((evento) => (
                                    <option
                                        key={SuperJSON.parse(evento).id}
                                        value={SuperJSON.parse(evento).id}
                                    >
                                        {SuperJSON.parse(evento).name}
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
                                htmlFor="date"
                            >
                                Fecha
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="datetime-local"
                                name="date"
                                value={torneo.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 w-1/2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="hour"
                            >
                                Precio
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="price"
                                value={torneo.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Content
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="content"
                            value={torneo.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button
                        disabled={status.isLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSave}
                    >
                        {status.isLoading && <Spinner />} Clonar
                    </button>
                </form>
            </div>
        </div>
    )
}
