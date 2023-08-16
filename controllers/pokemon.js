const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const isAuth = require('../middleware/isAuthorized').isAuth
const ROOT_URL = process.env.ROOT_URL

// INDUCES

// INDEX
router.get('/', isAuth, (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/team`)
})

// NEW
router.get('/new', isAuth, async (req, res) => {
    const generations = await fetch(`${ROOT_URL}/pokedex/1`)
        .then((res) => res.json())
    
    const genPokemon = []
    generations.pokemon_entries.forEach((pokemon) => {
        const pk = {}
        pk.num = pokemon.entry_number
        pk.name = pokemon.pokemon_species.name
        genPokemon.push(pk)
    })

    res.render('pokemon/new.ejs', {
        currentUser: req.session.currentUser,
        genPokemon: genPokemon
    })
})

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW
router.get('/:pokeID', isAuth, async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const foundPokemon = foundUser.teams.id(req.params.pokeID)
    res.send(foundPokemon)
})

module.exports = router