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
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [editingApp, setEditingApp] = useState<Application | null>(null)
    const [editForm, setEditForm] = useState({
        company: '',
        position: '',
        status: '',
        url: '',
        location: '',
        salary_range: '',
    })
    const [updating, setUpdating] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true) // <-- Loading para la carga de Applications
    const [statusFilter, setStatusFilter] = useState<string>('all')

    useEffect(() => {
        fetchApplications()
    }, [refreshTrigger])

    const filteredApps = statusFilter === 'all' ? applications : applications.filter((app) => app.status === statusFilter)

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

    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
    }

    const appToDelete = applications.find(app => app.id === deleteId)

    const confirmDelete = async () => {
        if (!deleteId) return

        setDeletingId(deleteId)

        try {
            const { error } = await supabase
                .from('applications')
                .delete()
                .eq('id', deleteId)

            if (error) throw error

            setDeleteId(null)
            fetchApplications()
        } catch (error) {
            console.error('Error deleting application: ', error)
            alert('Error deleting application')
        } finally {
            setDeletingId(null)
        }
    }

    const handleEditClick = (app: Application) => {
        setEditingApp(app)
        setEditForm({
            company: app.company,
            position: app.position,
            status: app.status,
            url: app.url || '',
            location: app.location || '',
            salary_range: app.salary_range || ''
        })
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!editingApp) return

        setUpdating(true)
        try {
            const { error } = await supabase
                .from('applications')
                .update({
                    company: editForm.company,
                    position: editForm.position,
                    status: editForm.status,
                    url: editForm.url,
                    location: editForm.location,
                    salary_range: editForm.salary_range
                }).eq('id', editingApp.id)

            if (error) throw error

            setEditingApp(null)
            fetchApplications()

            alert('Application Update')
        } catch (error) {
            console.error('Error updating application: ', error)
            alert('Error updating application!')
        } finally {
            setUpdating(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied':
                return 'bg-blue-300 text-blue-900'
            case 'Pending':
                return 'bg-yellow-300 text-yellow-900'
            case 'Rejected':
                return 'bg-red-100 text-red-800'
            case 'Interview':
                return 'bg-green-100 text-green-800'
            case 'Almost!':
                return 'bg-violet-700 text-violet-300'
            default:
                return 'bg-blue-100 text-blue-800'
        }
    }

    if (loading) {
        return <div className="text-center py-8 text-zinc-400">Loading applications...</div>
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-600 m-auto">No applications yet. Add your first one!</div>
        )
    }

    return (
        <div className="mt-8 space-y-4 w-[60vw] min-[900px]:w-[40vw] mx-auto ">
            {deleteId && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setDeleteId(null)} // <-- Si hacemos click fuera del cartel se cierra
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-sm mx-4 animate-[zoomIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()} // <-- Evita que el click dentro cierre el modal
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-red-400 bg-red-100 flex items-center justify-center">
                                <span className="text-red-600 text-xl -translate-y-1">⚠️</span>
                            </div>
                            <h3 className="text-xl text-center mb-2">Delete Application to <strong>{appToDelete?.company}</strong>?</h3>
                            <p className="text-sm text-gray-600 text-center">This action cannot be undone. The application will be <span className="font-bold">permanently deleted</span></p>

                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className=" border-l border-r border-black hover:bg-blue-300 cursor-pointer rounded-full px-4 py-1 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                className="border-l border-r border-red-600 text-red-800 hover:bg-red-300 cursor-pointer rounded-full px-4 py-1 transition-colors"
                                onClick={confirmDelete}
                                disabled={deletingId !== null}
                            >
                                {deletingId ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingApp && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setEditingApp(null)} // <-- Si hacemos click fuera del cartel se cierra
                >
                    <div
                        className="bg-white rounded-lg py-6 px-12 min-w-[30vw] mx-4 animate-[zoomIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // <-- Evita que el click dentro cierre el modal
                    >
                        <h3 className="text-center text-xl">Edit Application</h3>

                        <form className="space-y-4 py-4" onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-zinc-500 ">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={editForm.company}
                                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-zinc-500">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    value={editForm.position}
                                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-zinc-500">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    value={editForm.url}
                                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-zinc-500">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-blue-500">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    value={editForm.salary_range}
                                    onChange={(e) => setEditForm({ ...editForm, salary_range: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-zinc-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-zinc-500">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    required
                                    className={`w-full px-3 py-2 border rounded-lg outline-none text-zinc-500`}
                                />
                            </div>

                            <div className="flex flex-col justify-end gap-4 mt-8 px-4 md:px-16">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="border-l border-r border-green-600 text-green-800 hover:bg-green-100 cursor-pointer rounded-full px-4 py-1 transition-colors"
                                >

                                    {updating ? 'Saving changes...' : 'Save changes'}
                                </button>

                                <button
                                    onClick={() => setEditingApp(null)}
                                    className="border-l border-r border-black hover:bg-blue-300 cursor-pointer rounded-full px-4 py-1 transition-colors"
                                >

                                    Cancel
                                </button>


                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-2xl text-center font-bold text-zinc-200 pb-6">Your Applications </h2>

                <div className="flex justify-around">
                    <span className="text-md text-blue-400">Showing {filteredApps.length} of {applications.length} applications</span>
                    <div>
                        <label className="text-zinc-400">Filter: </label>
                        <select className="p-1 outline-none rounded-full bg-blue-300/80 text-blue-900 font-light hover:font-bold transition-all active:text-zinc-800" onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="Interview">Interview</option>
                            <option value="Applied">Applied</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Almost!">Almost!</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 pr-4 max-h-[70vh] overflow-auto">
                {filteredApps.length === 0 && (
                    <p className="text-center py-8 text-zinc-600 m-auto">No applications in this category</p>
                )}
                {filteredApps.map((app) => (
                    <div
                        key={app.id}
                        className="border-b border-black rounded-lg p-4 hover:shadow-xl bg-black/20 transition-shadow"
                    >
                        <div className="text-zinc-300 flex justify-between items-start relative">
                            <div className="pt-12 min-[600px]:p-0">
                                <h3 className="text-[1rem] font-light">Compania: <span className="font-bold">{app.company}</span></h3>
                                <p className="font-light mt-1">Posición: <span className="font-bold">{app.position}</span></p>
                                {app.location && (
                                    <p className="text-sm text-zinc-500 mt-2">Ubicación:📍{app.location}</p>
                                )}
                            </div>

                            <span className="text-xs absolute top-0 right-0 bg-black/50  p-3 rounded-full">
                                Estado <span className={`px-3 py-1  rounded-full text-sm ${getStatusColor(app.status)}`} >{app.status}</span>
                            </span>

                        </div>
                        {app.salary_range && (
                            <p className="text-zinc-500">Rango Salarial: <span className="text-blue-400">$US {app.salary_range}</span></p>
                        )}
                        <div className="mt-3 flex flex-col gap-4 text-sm text-zinc-600 relative">
                            <div className="flex justify-between">
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
                            </div>
                            <div className=" flex justify-end gap-4">
                                <button
                                    onClick={() => handleEditClick(app)}
                                    disabled={editingApp === app}
                                    className="text-sm px-4 py-1 rounded-full cursor-pointer border border-blue-900 transition-colors text-blue-300 font-light hover:bg-blue-900"
                                >
                                    {editingApp === app ? 'Editing...' : 'Edit'}
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(app.id)}
                                    disabled={deletingId === app.id}
                                    className="text-sm px-4 py-1 rounded-full cursor-pointer border border-red-900 transition-colors text-red-300 font-light hover:bg-red-900"
                                >
                                    {deletingId === app.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )

}