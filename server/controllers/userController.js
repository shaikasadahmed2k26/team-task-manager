const supabase = require('../config/supabase')

exports.getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users').select('id, name, email, created_at')
        if (error) throw error
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}