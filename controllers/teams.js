const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Team = require('../models/teams').Team
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
router.get('/new', isAuth, (req,res) => {
    res.render('teams/new.ejs', {
        currentUser: req.session.currentUser
    })
})

// DELETE - STRETCH GOAL
router.delete('/:teamID', async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const team = foundUser.teams.id(req.params.teamID).deleteOne()
    const foundteam = await Team.findByIdAndDelete(req.params.teamID)
    foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.params.userID}/teams/`)
})

// UPDATE - STRETCH GOAL

// CREATE - STRETCH GOAL
router.post('/', isAuth, async (req, res) => {
    const team = await Team.create(req.body)
    const foundUser = await User.findById(req.params.userID)
    foundUser.teams.push(team)
    foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.session.currentUser._id}/teams/`)
})

// EDIT - STRETCH GOAL

// SHOW
router.get('/team', isAuth, (req, res) => {
    res.render('teams/show.ejs', {
        currentUser: req.session.currentUser
    })
})

module.exports = router