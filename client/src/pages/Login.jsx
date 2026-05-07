import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { CheckCircle, Users, BarChart3 } from 'lucide-react'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await API.post('/auth/login', form)
            login(data.token, data.user)
            toast.success(`Welcome back, ${data.user.name}!`)
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>Manage Tasks, Build Teams</h1>
                    <p>Streamline your workflow and boost productivity with our intuitive task management platform.</p>
                    <div className="features">
                        <div className="feature">
                            <CheckCircle size={20} />
                            <span>Organize tasks with drag & drop</span>
                        </div>
                        <div className="feature">
                            <Users size={20} />
                            <span>Collaborate with your team</span>
                        </div>
                        <div className="feature">
                            <BarChart3 size={20} />
                            <span>Track progress in real time</span>
                        </div>
                    </div>
                </div>
                <div className="floating-circles">
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <div className="circle circle3"></div>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-logo">
                        <h1>TaskFlow</h1>
                        <p>Team Task Manager</p>
                    </div>
                    <h2 className="auth-title">Welcome back 👋</h2>
                    <p className="auth-subtitle">Sign in to your account to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}