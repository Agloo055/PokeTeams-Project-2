const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users.js')

// NEW
router.get('/new', (req, res) => {
    
})

// CREATE
router.post('/', (req, res) => {

})

// DELETE
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router