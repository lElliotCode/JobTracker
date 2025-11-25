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
            <h2 className="text-2xl text-center font-bold text-zinc-200">Your Applications</h2>
            <div className="grid gap-4 pr-4 max-h-[70vh] overflow-auto">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="border border-black rounded-lg p-4 hover:shadow-2xl transition-shadow"
                    >
                        <div className="text-zinc-300 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-light">Compania: <span className="font-bold">{app.company}</span></h3>
                                <p className="font-light mt-1">Posición: <span className="font-bold">{app.position}</span></p>
                                {app.location && (
                                    <p className="text-sm text-zinc-500 mt-2">Ubicación:📍{app.location}</p>
                                )}
                            </div>
                            <span className="text-sm">
                                Estado: <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{app.status}</span>
                            </span>
                        </div>

                        <div className="mt-3 flex gap-4 text-sm text-zinc-600">
                            <span>Applied: {new Date(app.applied_date).toLocaleDateString()}</span>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}