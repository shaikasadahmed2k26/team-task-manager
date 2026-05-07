import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Sidebar from '../components/Sidebar'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { Plus, X, ArrowLeft, Calendar } from 'lucide-react'

const COLUMNS = [
    { id: 'todo', label: 'To Do', color: '#6b7280' },
    { id: 'in_progress', label: 'In Progress', color: '#3b82f6' },
    { id: 'done', label: 'Done', color: '#10b981' },
]

export default function TaskBoard() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '', description: '', priority: 'medium',
        due_date: '', assigned_to: ''
    })

    const fetchTasks = async () => {
        try {
            const { data } = await API.get(`/tasks?project_id=${id}`)
            setTasks(data)
        } catch { toast.error('Failed to load tasks') }
    }

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/users')
            setUsers(data)
        } catch { console.error('Failed to load users') }
    }

    useEffect(() => {
        fetchTasks()
        fetchUsers()
    }, [id])

    const handleCreate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.post('/tasks', { ...form, project_id: id })
            toast.success('Task created!')
            setShowModal(false)
            setForm({ title: '', description: '', priority: 'medium', due_date: '', assigned_to: '' })
            fetchTasks()
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create task')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`)
            toast.success('Task deleted')
            fetchTasks()
        } catch { toast.error('Failed to delete task') }
    }

    const onDragEnd = async (result) => {
        if (!result.destination) return
        const { draggableId, destination } = result
        const newStatus = destination.droppableId
        setTasks(prev => prev.map(t => t.id === draggableId ? { ...t, status: newStatus } : t))
        try {
            await API.put(`/tasks/${draggableId}`, { status: newStatus })
            toast.success('Task updated!')
        } catch { toast.error('Failed to update task') }
    }

    const isOverdue = (due_date, status) =>
        due_date && new Date(due_date) < new Date() && status !== 'done'

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="btn btn-outline"
                            onClick={() => navigate('/projects')}
                            style={{ padding: '8px 12px' }}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <h1 className="page-title">Task Board</h1>
                            <p className="page-subtitle">Drag and drop tasks to update status</p>
                        </div>
                    </div>
                    <button className="btn btn-icon" onClick={() => setShowModal(true)}>
                        <Plus size={18} /> Add Task
                    </button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="board-container">
                        {COLUMNS.map(col => (
                            <div key={col.id} className="board-column">
                                <div className="column-header">
                                    <div className="column-title">
                                        <div style={{
                                            width: '10px', height: '10px',
                                            borderRadius: '50%', background: col.color
                                        }} />
                                        {col.label}
                                    </div>
                                    <span className="column-count">
                                        {tasks.filter(t => t.status === col.id).length}
                                    </span>
                                </div>

                                <Droppable droppableId={col.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                minHeight: '100px',
                                                background: snapshot.isDraggingOver ? 'rgba(108,99,255,0.05)' : 'transparent',
                                                borderRadius: '10px',
                                                transition: 'background 0.2s',
                                                padding: '4px'
                                            }}
                                        >
                                            {tasks.filter(t => t.status === col.id).map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="task-card"
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? 0.85 : 1,
                                                                boxShadow: snapshot.isDragging ? 'var(--shadow-lg)' : undefined,
                                                                transform: snapshot.isDragging
                                                                    ? `${provided.draggableProps.style?.transform} rotate(2deg)`
                                                                    : provided.draggableProps.style?.transform
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                <div className="task-title">{task.title}</div>
                                                                <button
                                                                    onClick={() => handleDelete(task.id)}
                                                                    style={{
                                                                        background: 'none', border: 'none',
                                                                        cursor: 'pointer', color: '#9ca3af',
                                                                        padding: '2px', flexShrink: 0
                                                                    }}
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                            {task.description && (
                                                                <div className="task-desc">{task.description}</div>
                                                            )}
                                                            <div className="task-meta">
                                                                <span className={`priority-badge priority-${task.priority}`}>
                                                                    {task.priority}
                                                                </span>
                                                                {task.due_date && (
                                                                    <span className={`due-date ${isOverdue(task.due_date, task.status) ? 'overdue' : ''}`}>
                                                                        <Calendar size={11} />
                                                                        {new Date(task.due_date).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">Create New Task</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleCreate}>
                                <div className="form-group">
                                    <label>Task Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Design login page"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Task details..."
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className="form-group">
                                        <label>Priority</label>
                                        <select
                                            value={form.priority}
                                            onChange={e => setForm({ ...form, priority: e.target.value })}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input
                                            type="date"
                                            value={form.due_date}
                                            onChange={e => setForm({ ...form, due_date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Assign To</label>
                                    <select
                                        value={form.assigned_to}
                                        onChange={e => setForm({ ...form, assigned_to: e.target.value })}
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-icon" disabled={loading}>
                                        {loading ? 'Creating...' : 'Create Task'}
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