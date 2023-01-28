'use client'

import Spinner from '../elements/Spinner'
import { useState } from 'react'

export default function EditCasino({ currentcasino }) {
    const [casino, setCasino] = useState({
        id: currentcasino?.id,
        name: currentcasino?.name,
        slug: currentcasino?.slug,
        color: currentcasino?.color,
        logo: currentcasino?.logo,
        content: currentcasino?.content,
    })

    const [status, setStatus] = useState({
        error: '',
        success: false,
        isLoading: false,
    })

    const handleChange = (event) => {
        setCasino({
            ...casino,
            [event.target.name]: event.target.value,
        })
    }

    const handleSave = async () => {
        setStatus({ error: '', success: false, isLoading: true })

        const data = {
            casino: casino,
        }

        const response = await fetch('/api/casino/store', {
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
                            value={casino.name}
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
                            value={casino.slug}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="color"
                        >
                            Color
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="color"
                            value={casino.color}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="color"
                        >
                            Logo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="logo"
                            value={casino.logo}
                            onChange={handleChange}
                        />
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
                            value={casino.content}
                            onChange={handleChange}
                        ></textarea>
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
