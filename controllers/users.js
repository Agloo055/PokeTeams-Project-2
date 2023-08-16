const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

// NEW
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// CREATE
router.post('/', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const newUser = await User.create(req.body)
    req.session.currentUser = newUser
    res.redirect('/')
    //res.redirect(`/users/${newUser.id}/teams`)
})

module.exports = router