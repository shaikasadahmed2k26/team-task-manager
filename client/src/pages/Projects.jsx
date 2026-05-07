import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { Plus, X, FolderKanban, Users } from 'lucide-react'

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects')
            setProjects(data)
        } catch (err) {
            toast.error('Failed to load projects')
        }
    }

    useEffect(() => { fetchProjects() }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.post('/projects', form)
            toast.success('Project created!')
            setShowModal(false)
            setForm({ name: '', description: '' })
            fetchProjects()
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Projects</h1>
                        <p className="page-subtitle">Manage and track all your team projects</p>
                    </div>
                    <button className="btn btn-icon" onClick={() => setShowModal(true)}>
                        <Plus size={18} /> New Project
                    </button>
                </div>

                {projects.length === 0 ? (
                    <div className="empty-state">
                        <FolderKanban size={48} />
                        <p>No projects yet</p>
                        <span>Create your first project to get started</span>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                className="project-card"
                                onClick={() => navigate(`/projects/${p.project_id}`)}
                            >
                                <div className="project-name">{p.projects?.name}</div>
                                <div className="project-desc">
                                    {p.projects?.description || 'No description provided'}
                                </div>
                                <div className="project-meta">
                                    <span style={{
                                        background: p.role === 'admin' ? 'var(--primary-light)' : 'var(--border)',
                                        color: p.role === 'admin' ? 'var(--primary)' : 'var(--text-secondary)',
                                        padding: '3px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        textTransform: 'capitalize'
                                    }}>
                                        {p.role}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={12} />
                                        {new Date(p.projects?.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">Create New Project</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleCreate}>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Website Redesign"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        placeholder="What is this project about?"
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-icon" disabled={loading}>
                                        {loading ? 'Creating...' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}