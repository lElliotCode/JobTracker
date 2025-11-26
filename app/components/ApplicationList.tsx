'use client'

import { useEffect, useState } from "react"
import { supabase } from '@/lib/supabase'

type Application = {
    id: string,
    company: string,
    position: string,
    status: string,
    applied_date: string,
    url: string | null,
    location: string | null,
    salary_range: string | null
}

type Props = {
    refreshTrigger?: number
}

export default function ApplicationList({ refreshTrigger }: Props) {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplications()
    }, [refreshTrigger])

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('applied_date', { ascending: false })

            if (error) throw error
            setApplications(data || [])
        } catch (error) {
            console.error('Error fetching applications: ', error)
        } finally {
            setLoading(false)
        }
    }


    if (loading) {
        return <div className="text-center py-8 text-zinc-400">Loading applications...</div>
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-600">No applications yet. Add your first one above!</div>
        )
    }

    return (
        <div className="mt-8 space-y-4 w-[60vw] min-[900px]:w-[40vw] mx-auto ">
            <div>
                <h2 className="text-2xl text-center font-bold text-zinc-200">Your Applications </h2>
                <span className="text-md text-blue-400">Total App's: {applications.length}</span>
            </div>
            <div className="grid gap-4 pr-4 max-h-[70vh] overflow-auto">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="border-b border-black rounded-lg p-4 hover:shadow-xl bg-black/20 transition-shadow"
                    >
                        <div className="text-zinc-300 flex justify-between items-start relative">
                            <div>
                                <h3 className="text-[1rem] font-light">Compania: <span className="font-bold">{app.company}</span></h3>
                                <p className="font-light mt-1">Posición: <span className="font-bold">{app.position}</span></p>
                                {app.location && (
                                    <p className="text-sm text-zinc-500 mt-2">Ubicación:📍{app.location}</p>
                                )}
                            </div>

                            <span className="text-sm absolute top-0 right-0 bg-black/50  p-3 rounded-full">
                                Estado: <span className={`px-3 py-1  rounded-full text-sm ${app.status === 'Applied' ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-700"}`} >{app.status}</span>
                            </span>

                        </div>
                        {app.salary_range && (
                            <p className="text-zinc-500">Rango Salarial: <span className="text-blue-400">$US {app.salary_range}</span></p>
                        )}
                        <div className="mt-3 flex gap-4 text-sm text-zinc-600 relative">
                            <span className="text-gray-400">Applied: {new Date(app.applied_date).toLocaleDateString()}</span>
                            {app.url && (
                                <p className="">URL:
                                    <a
                                        href={app.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pl-2 text-blue-600 hover:underline"
                                    >
                                        View posting →
                                    </a>
                                </p>
                            )}
                            <button
                                onClick={() => alert(`Deleting application ${app.company}`)}
                                className="text-sm absolute bottom-0 right-2 px-4 py-1 rounded-full cursor-pointer border border-red-900 transition-colors text-red-300 font-light hover:bg-red-900"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )

}