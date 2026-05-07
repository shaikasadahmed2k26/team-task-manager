const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    createProject, getProjects, addMember, removeMember
} = require('../controllers/projectController')

router.post('/', auth, createProject)
router.get('/', auth, getProjects)
router.post('/add-member', auth, addMember)
router.post('/remove-member', auth, removeMember)

module.exports = router