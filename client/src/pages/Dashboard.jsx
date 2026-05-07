import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import API from '../api/axios'
import { CheckCircle, Clock, AlertCircle, LayoutDashboard } from 'lucide-react'

export default function Dashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksRes, projectsRes] = await Promise.all([
                    API.get('/tasks'),
                    API.get('/projects')
                ])
                setTasks(tasksRes.data)
                setProjects(projectsRes.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const todo = tasks.filter(t => t.status === 'todo').length
    const inProgress = tasks.filter(t => t.status === 'in_progress').length
    const done = tasks.filter(t => t.status === 'done').length
    const overdue = tasks.filter(t =>
        t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done'
    ).length

    const stats = [
        { label: 'Total Tasks', value: tasks.length, icon: <LayoutDashboard size={24} />, color: '#6c63ff', bg: '#ede9ff' },
        { label: 'In Progress', value: inProgress, icon: <Clock size={24} />, color: '#3b82f6', bg: '#dbeafe' },
        { label: 'Completed', value: done, icon: <CheckCircle size={24} />, color: '#10b981', bg: '#d1fae5' },
        { label: 'Overdue', value: overdue, icon: <AlertCircle size={24} />, color: '#ef4444', bg: '#fee2e2' },
    ]

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Good day, {user?.name} 👋</h1>
                        <p className="page-subtitle">Here's what's happening with your projects</p>
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="stat-value">{loading ? '—' : stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Recent Projects
                        </h3>
                        {projects.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                No projects yet. Create one!
                            </p>
                        ) : (
                            projects.slice(0, 4).map((p, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(`/projects/${p.project_id}`)}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border)',
                                        marginBottom: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                >
                                    <div style={{ fontSize: '14px', fontWeight: '500' }}>
                                        {p.projects?.name}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                        {p.role}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Task Overview
                        </h3>
                        {[
                            { label: 'To Do', value: todo, color: '#6b7280' },
                            { label: 'In Progress', value: inProgress, color: '#3b82f6' },
                            { label: 'Done', value: done, color: '#10b981' },
                        ].map((item, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.label}</span>
                                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{item.value}</span>
                                </div>
                                <div style={{ background: 'var(--border)', borderRadius: '999px', height: '6px' }}>
                                    <div style={{
                                        width: tasks.length ? `${(item.value / tasks.length) * 100}%` : '0%',
                                        background: item.color,
                                        height: '100%',
                                        borderRadius: '999px',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}