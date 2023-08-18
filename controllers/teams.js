const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const genMaker = require('../middleware/genMaker')
const isAuth = require('../middleware/isAuthorized').isAuth

// INDUCES

// INDEX
router.get('/', isAuth, async (req, res) => {
    if(!genMaker.genPokemon.length) await genMaker.genMaker()
    res.render('teams/index.ejs', {
        currentUser: req.session.currentUser
    })
})

// NEW - STRETCH GOAL

// DELETE - STRETCH GOAL

// UPDATE - STRETCH GOAL

// CREATE - STRETCH GOAL

// EDIT - STRETCH GOAL

// SHOW
router.get('/team', isAuth, (req, res) => {
    res.render('teams/show.ejs', {
        currentUser: req.session.currentUser
    })
})

module.exports = router