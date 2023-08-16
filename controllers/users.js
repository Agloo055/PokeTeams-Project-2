const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

// NEW
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// CREATE

module.exports = router