'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AddApplicationForm() {
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [location, setLocation] = useState('')
    const [url, setUrl] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('applications')
                .insert([{ company, position, location, url, status }])

            if (error) throw error

            //Reset Form

            setCompany('')
            setPosition('')
            setLocation('')
            setUrl('')
            setStatus('')
            alert('Application added!')
        } catch (error) { 
            console.error('Error: ', error)
            alert('Error adding appliaction')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300 ">
                    Company
                </label>
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                    Position
                </label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                    URL
                </label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                    Location
                </label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                    Status
                </label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pinter bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >

                {loading ? 'Adding...' : 'Add Application'}
            </button>
        </form>
    )
}