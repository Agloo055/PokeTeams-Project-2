const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Pokemon = require('../models/pokemon').Pokemon
const { route } = require('./sessions')
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
    const pkmModel = {}
    const pkm = req.body.pokemon.split(' ')
    pkmModel.num = Number(pkm[0])
    pkmModel.pokemon = pkm[1]

    if(req.body.nickname){
        pkmModel.nickname = req.body.nickname
    } else {
        pkmModel.nickname = pkmModel.pokemon
    }

    const pkmSpecies = await fetch(`${ROOT_URL}/pokemon-species/${pkmModel.num}`)
        .then((res) => res.json())
    const pkmMain = await fetch(`${ROOT_URL}/pokemon/${pkmModel.num}`)
        .then((res) => res.json())
    
    pkmModel.img = pkmMain.sprites.front_default
    pkmModel.typing = []
    pkmMain.types.forEach((type) => {
        pkmModel.typing.push(type.type.name)
    })

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