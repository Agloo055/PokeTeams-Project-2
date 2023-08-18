const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Pokemon = require('../models/pokemon').Pokemon
const isAuth = require('../middleware/isAuthorized').isAuth
const pokeMaker = require('../middleware/pokeMaker')
const genMaker = require('../middleware/genMaker')
const ROOT_URL = process.env.ROOT_URL

// INDUCES

// INDEX
router.get('/', isAuth, (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/team`)
})

// NEW
router.get('/new', isAuth, (req, res) => {
    
    const genPokemon = genMaker.genPokemon

    res.render('pokemon/new.ejs', {
        currentUser: req.session.currentUser,
        genPokemon: genPokemon
    })
})

// DELETE
router.delete('/:pokeID', async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const pokemon = foundUser.teams.id(req.params.pokeID).deleteOne()
    const foundPokemon = await Pokemon.findByIdAndDelete(req.params.pokeID)
    foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.params.userID}/teams/team/`)
})

// UPDATE

// CREATE
router.post('/', async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/team/pokemon/new'>Choose a pokemon!</a>`)
    }
    const pkmModel = await pokeMaker(req.body)

    const pokemon = await Pokemon.create(pkmModel)
    const user = await User.findById(req.params.userID)
    user.teams.push(pokemon)
    await user.save()
    req.session.currentUser = user
    res.redirect(`/users/${req.session.currentUser._id}/teams/team`)
})

// EDIT

// SHOW
router.get('/:pokeID', isAuth, async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const foundPokemon = foundUser.teams.id(req.params.pokeID)
    res.send(foundPokemon)
})

module.exports = router