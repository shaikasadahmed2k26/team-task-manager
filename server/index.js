const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')

const app = express()

app.use(cors({
  origin: ['https://team-task-manager-two-navy.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Team Task Manager API is running!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

