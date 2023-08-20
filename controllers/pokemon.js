const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Team = require('../models/teams').Team
const Pokemon = require('../models/pokemon').Pokemon
const isAuth = require('../middleware/isAuthorized').isAuth
const pokeMaker = require('../middleware/pokeMaker')
const genMaker = require('../middleware/genMaker')
const ROOT_URL = process.env.ROOT_URL

// INDUCES

// INDEX
router.get('/', isAuth, (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
})

// NEW
router.get('/new', isAuth, (req, res) => {
    
    const genPokemon = genMaker.genPokemon

    res.render('pokemon/new.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
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
    res.redirect(`/users/${req.params.userID}/teams/${req.params.teamID}/`)
})

// UPDATE
router.put('/:pokeID', async (req,res) => {
    const pkmModel = await pokeMaker(req.body)
    
    const foundUser = await User.findById(req.params.userID)
    const foundPokemon = await Pokemon.findByIdAndUpdate(req.params.pokeID, pkmModel, {new: true})
    const pokemon = foundUser.teams.id(req.params.pokeID)

    foundUser.teams.splice(foundUser.teams.indexOf(pokemon), 1, foundPokemon)
    
    await foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}`)
})


// CREATE
router.post('/', async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new'>Choose a pokemon!</a>`)
    }
    const pkmModel = await pokeMaker(req.body)

    const pokemon = await Pokemon.create(pkmModel)
    const team = await Team.findById(req.params.teamID)
    const user = await User.findById(req.params.userID)
    team.members.push(pokemon)
    await team.save()
    user.teams.splice(user.teams.indexOf(team), 1, team)
    await user.save()
    req.session.currentUser = user
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
})

// EDIT
router.get('/:pokeID/edit', isAuth, async (req, res) => {
    
    const genPokemon = genMaker.genPokemon
    const foundUser = await User.findById(req.params.userID)
    const pokemon = foundUser.teams.id(req.params.pokeID)

    res.render('pokemon/edit.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        genPokemon: genPokemon,
        pokemon: pokemon
    })
})

// SHOW
router.get('/:pokeID', isAuth, async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const foundPokemon = foundUser.teams.id(req.params.pokeID)
    res.render('pokemon/show.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokemon: foundPokemon
    })
})

module.exports = router