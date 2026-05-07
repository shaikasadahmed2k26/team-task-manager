import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setIsDarkMode(true)
            applyDarkMode()
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
        if (newTheme) {
            applyDarkMode()
        } else {
            applyLightMode()
        }
    }

    const applyDarkMode = () => {
        document.documentElement.style.setProperty('--bg', 'linear-gradient(135deg, #0a0a1a 0%, #0f0a1f 50%, #0a0f1f 100%)')
        document.documentElement.style.setProperty('--surface', '#1a1a2e')
        document.documentElement.style.setProperty('--secondary', '#16213e')
        document.documentElement.style.setProperty('--text-primary', '#e2e8f0')
        document.documentElement.style.setProperty('--text-secondary', '#94a3b8')
        document.documentElement.style.setProperty('--border', '#2d2d44')
        document.documentElement.style.setProperty('--primary-light', '#2d2b55')
    }

    const applyLightMode = () => {
        document.documentElement.style.setProperty('--bg', 'linear-gradient(135deg, #f0f0ff 0%, #f5f0ff 50%, #f0f5ff 100%)')
        document.documentElement.style.setProperty('--surface', '#ffffff')
        document.documentElement.style.setProperty('--secondary', '#f8f7ff')
        document.documentElement.style.setProperty('--text-primary', '#1a1a2e')
        document.documentElement.style.setProperty('--text-secondary', '#6b7280')
        document.documentElement.style.setProperty('--border', '#e5e7eb')
        document.documentElement.style.setProperty('--primary-light', '#ede9ff')
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)