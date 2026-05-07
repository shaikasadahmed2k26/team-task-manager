const supabase = require('../config/supabase')

exports.createProject = async (req, res) => {
    const { name, description } = req.body
    const userId = req.user.id
    try {
        const { data, error } = await supabase.from('projects')
            .insert([{ name, description, created_by: userId }])
            .select().single()
        if (error) throw error

        await supabase.from('project_members')
            .insert([{ project_id: data.id, user_id: userId, role: 'admin' }])

        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getProjects = async (req, res) => {
    const userId = req.user.id
    try {
        const { data, error } = await supabase
            .from('project_members')
            .select('project_id, role, projects(*)')
            .eq('user_id', userId)
        if (error) throw error
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.addMember = async (req, res) => {
    const { project_id, user_email } = req.body
    try {
        const { data: user, error: userError } = await supabase
            .from('users').select('id').eq('email', user_email).single()
        if (userError || !user) return res.status(404).json({ error: 'User not found' })

        const { data, error } = await supabase.from('project_members')
            .insert([{ project_id, user_id: user.id, role: 'member' }])
            .select().single()
        if (error) throw error
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.removeMember = async (req, res) => {
    const { project_id, user_id } = req.body
    try {
        const { error } = await supabase.from('project_members')
            .delete().eq('project_id', project_id).eq('user_id', user_id)
        if (error) throw error
        res.json({ message: 'Member removed' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}