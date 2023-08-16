const router = require('express').Router({mergeParams: true})
const User = require('../models/users')

const isAuth = require('../middleware/isAuthorized').isAuth

// INDUCES

// INDEX
router.get('/', isAuth, (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/team`)
})

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

module.exports = router