import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { CheckCircle, Users, BarChart3 } from 'lucide-react'

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const getPasswordStrength = (password) => {
        if (password.length < 6) return { level: 1, label: 'Weak', color: 'red' }
        let score = 2 // Fair
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score = 3 // Good
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score = 4 // Strong
        const colors = { 1: 'red', 2: 'orange', 3: 'yellow', 4: 'green' }
        const labels = { 1: 'Weak', 2: 'Fair', 3: 'Good', 4: 'Strong' }
        return { level: score, label: labels[score], color: colors[score] }
    }

    const strength = getPasswordStrength(form.password)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }
        setLoading(true)
        try {
            const { data } = await API.post('/auth/signup', form)
            login(data.token, data.user)
            toast.success(`Welcome, ${data.user.name}!`)
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.error || 'Signup failed')
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
                    <h2 className="auth-title">Create your account</h2>
                    <p className="auth-subtitle">Start managing tasks with your team</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
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
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                required
                            />
                            {form.password && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className={`strength-segment ${i <= strength.level ? `active ${strength.color}` : ''}`}></div>
                                        ))}
                                    </div>
                                    <div className={`strength-label ${strength.color}`}>{strength.label}</div>
                                </div>
                            )}
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}