const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users.js')

// NEW
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

// CREATE
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if (!foundUser){
            res.send("<a href='/'> No username found!</a>")
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect('/')
        } else {
            res.send("<a href='/'>Password does not match!</a>")
        }
    } catch (err) {
        console.log(err)
        res.send('db/server has found a problem!')
    }
})

// DELETE
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router