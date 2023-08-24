const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Team = require('../models/teams').Team
const Pokemon = require('../models/pokemon').Pokemon
const isAuth = require('../middleware/isAuthorized').isAuth
const isAuthNew = require('../middleware/isAuthorized').isAuthNew
const isAuthEdit = require('../middleware/isAuthorized').isAuthEdit

const pokeMaker = require('../middleware/pokeMaker')
const getPkm = require('../middleware/pokeMaker')

const genMaker = require('../middleware/genMaker')

const pokeEditor = require('../middleware/pokeEditor')
const getPkmEdit = require('../middleware/pokeEditor')
const setPkm = require('../middleware/pokeEditor').setPkmModel

const ROOT_URL = process.env.ROOT_URL

// INDUCES

// INDEX
router.get('/', isAuth, (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
})

// NEW POKEMON PAGE
router.get('/new/pokemon', isAuthNew, (req, res) => {
    const genPokemon = genMaker.genPokemon

    res.render('pokemon/new.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        genPokemon: genPokemon
    })
})

// NEW FORM PAGE
router.get('/new/forms', isAuthNew, (req, res) => {
    
    const pkmSpecies = getPkm.getPkmSpecies()
    const pkmModel = getPkm.getPkmModel()

    const forms = []
    pkmSpecies.varieties.forEach((form) => {
        forms.push(form.pokemon.name)
    })

    res.render('pokemon/newForm.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        forms: forms,
        pokemon: pkmModel.pokemon
    })
})

// NEW DATA PAGE
router.get('/new/data', isAuthNew, (req, res) => {
    let hasShiny = true
    const abilities = []
    const moves = []

    const pkmMain = getPkm.getPkmMain()
    const pkmModel = getPkm.getPkmModel()

    if(pkmMain.sprites.front_shiny === null) hasShiny = false

    pkmMain.abilities.forEach((ability) => {
        abilities.push(ability.ability.name)
    })

    pkmMain.moves.forEach((move) => {
        moves.push(move.move.name)
    })

    res.render('pokemon/newData.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokemon: pkmModel.pokemon,
        hasShiny: hasShiny,
        abilities: abilities,
        moves: moves
    })
})

// DELETE
router.delete('/:pokeID', async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const foundTeam = await Team.findById(req.params.teamID)
    const uPokemon = foundUser.teams.id(req.params.teamID).members.id(req.params.pokeID).deleteOne()
    const tPokemon = foundTeam.members.id(req.params.pokeID).deleteOne()
    const foundPokemon = await Pokemon.findByIdAndDelete(req.params.pokeID)
    await foundTeam.save()
    await foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.params.userID}/teams/${req.params.teamID}/`)
})

// UPDATE POKEMON PAGE
router.put('/:pokeID', async (req,res) => {
    await pokeEditor.pokeEditor(req.body)
    
    const pkmSpecies = getPkmEdit.getPkmSpecies()
    if(pkmSpecies.varieties.length > 1){
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/form`)
    } else {
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/data`)
    }
})

// UPDATE FORM PAGE
router.put('/:pokeID/form', async (req,res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}'>Choose a pokemon!</a>`)
    }
    await pokeEditor.pokeEditorForms(req.body)
    
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/data`)
})

// UPDATE DATA PAGE
router.put('/:pokeID/data', async (req,res) => {
    pokeEditor.pokeEditorData(req.body)
    const pkmModel = getPkmEdit.getPkmModel()
    
    const foundUser = await User.findById(req.params.userID)
    const foundTeam = await Team.findById(req.params.teamID)
    const foundPokemon = await Pokemon.findByIdAndUpdate(req.params.pokeID, pkmModel, {new: true})
    let pokemon = foundTeam.members.id(req.params.pokeID)

    foundTeam.members.splice(foundTeam.members.indexOf(pokemon), 1, foundPokemon)
    await foundTeam.save()

    pokemon = foundTeam.members.id(req.params.pokeID)
    const team = foundUser.teams.id(req.params.teamID)

    foundUser.teams.id(team).members.splice(foundTeam.members.indexOf(pokemon), 1, foundPokemon)
    await foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}`)
})

// Create
// CREATE POKEMON PAGE
router.post('/', async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new'>Choose a pokemon!</a>`)
    }
    await pokeMaker.pokeMaker(req.body)

    const pkmSpecies = getPkm.getPkmSpecies()
    if(pkmSpecies.varieties.length > 1){
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new/forms`)
    } else {
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new/data`)
    }
})

// CREATE FORM PAGE
router.post('/new', async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new'>Choose a pokemon!</a>`)
    }
    await pokeMaker.pokeMakerForms(req.body)
    
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new/data`)
})

// CREATE DATA PAGE
router.post('/new/data', async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new'>Choose a pokemon!</a>`)
    }

    pokeMaker.pokeMakerData(req.body)
    
    const pkmModel = getPkm.getPkmModel()

    const pokemon = await Pokemon.create(pkmModel)
    const team = await Team.findById(req.params.teamID)
    const user = await User.findById(req.params.userID)
    team.members.push(pokemon)
    await team.save()
    user.teams.id(team).members.push(pokemon)
    await user.save()
    req.session.currentUser = user
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
})

// EDIT POKEMON PAGE
router.get('/:pokeID/edit/pokemon', isAuthEdit, async (req, res) => {
    
    const genPokemon = genMaker.genPokemon
    const foundTeam = await Team.findById(req.params.teamID)
    const pokemon = foundTeam.members.id(req.params.pokeID)

    setPkm(pokemon)

    res.render('pokemon/edit.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        genPokemon: genPokemon,
        pokemon: pokemon
    })
})

// EDIT FORM PAGE
router.get('/:pokeID/edit/form', isAuthEdit, async (req, res) => {
    const pkmModel = getPkmEdit.getPkmModel()
    const pkmSpecies = getPkmEdit.getPkmSpecies()
    const curPkmModel = getPkmEdit.getCurPkmModel()

    let isSame = false
    curPkmModel.pokemon === pkmModel.pokemon ? isSame = true : isSame = false

    const forms = []
    pkmSpecies.varieties.forEach((form) => {
        forms.push(form.pokemon.name)
    })

    res.render('pokemon/editForm.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokeID: req.params.pokeID,
        forms: forms,
        pokemon: pkmModel.pokemon,
        curForm: curPkmModel.form,
        isSame: isSame
    })
})

// EDIT DATA PAGE
router.get('/:pokeID/edit/data', isAuthEdit, async (req, res) => {
    const pkmModel = getPkmEdit.getPkmModel()
    const curPkmModel = getPkmEdit.getCurPkmModel()
    const pkmMain = getPkmEdit.getPkmMain()
    let isSame = false
    if((curPkmModel.pokemon === pkmModel.pokemon) && (curPkmModel.form === pkmModel.form)){
        isSame = true 
    } else {
        isSame = false
    }

    let hasShiny = true
    const abilities = []
    const moves = []

    if(pkmMain.sprites.front_shiny === null) hasShiny = false

    pkmMain.abilities.forEach((ability) => {
        abilities.push(ability.ability.name)
    })

    pkmMain.moves.forEach((move) => {
        moves.push(move.move.name)
    })

    res.render('pokemon/editData.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokeID: req.params.pokeID,
        pokemon: pkmModel.pokemon,
        curPokemon: curPkmModel,
        hasShiny: hasShiny,
        abilities: abilities,
        moves: moves,
        isSame: isSame
    })
})

// SHOW
router.get('/:pokeID', isAuth, async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamID)
    const foundPokemon = foundTeam.members.id(req.params.pokeID)
    res.render('pokemon/show.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokemon: foundPokemon
    })
})

module.exports = router