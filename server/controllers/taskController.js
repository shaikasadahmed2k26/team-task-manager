const supabase = require('../config/supabase')

exports.createTask = async (req, res) => {
    const { project_id, title, description, priority, due_date, assigned_to } = req.body
    const userId = req.user.id
    try {
        const { data, error } = await supabase.from('tasks')
            .insert([{
                project_id,
                title,
                description,
                priority,
                due_date: due_date || null,
                assigned_to: assigned_to || null,
                created_by: userId
            }])
            .select().single()
        if (error) throw error
        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getTasks = async (req, res) => {
    const { project_id } = req.query
    try {
        let query = supabase.from('tasks').select('*')
        if (project_id) query = query.eq('project_id', project_id)
        const { data, error } = await query
        if (error) throw error
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    try {
        const { data, error } = await supabase.from('tasks')
            .update(updates).eq('id', id).select().single()
        if (error) throw error
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const { error } = await supabase.from('tasks').delete().eq('id', id)
        if (error) throw error
        res.json({ message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}