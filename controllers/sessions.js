const bcrypt = require('bcrypt')
const User = require('../models/users.js')

const isNotAuth = require('../middleware/isAuthorized.js').isNotAuth

// NEW
const newPage = (req, res) => {
    res.render('sessions/new.ejs')
}

// CREATE
const createPage = async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if (!foundUser){
            res.send("<a href='/'> No username found!</a>")
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect(`/users/${foundUser._id}/teams`)
        } else {
            res.send("<a href='/'>Password does not match!</a>")
        }
    } catch (err) {
        console.log(err)
        res.send('db/server has found a problem!')
    }
}

// DELETE
const deletePage = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

module.exports = {
    newPage, createPage, deletePage
}