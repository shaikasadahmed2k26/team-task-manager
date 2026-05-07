import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { LayoutDashboard, FolderKanban, LogOut, CheckSquare, Moon, Sun } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Sidebar() {
    const { user, logout } = useAuth()
    const { isDarkMode, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully')
        navigate('/login')
    }

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>TaskFlow</h2>
                <span>Team Task Manager</span>
            </div>
            <nav className="sidebar-nav">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <FolderKanban size={18} />
                    Projects
                </NavLink>
            </nav>
            <div className="sidebar-bottom">
                <button className="nav-item theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="user-info">
                    <div className="avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="user-name">{user?.name}</div>
                        <div className="user-email">{user?.email}</div>
                    </div>
                </div>
                <button className="nav-item btn-danger" onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    )
}