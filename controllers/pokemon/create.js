const User = require('../../models/users')
const Team = require('../../models/teams').Team
const Pokemon = require('../../models/pokemon').Pokemon

const pokeMaker = require('../../middleware/pokeMaker')
const getPkm = require('../../middleware/pokeMaker')

// CREATE POKEMON PAGE
const createPagePokemon = async (req, res) => {
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
}

// CREATE FORM PAGE
const createPageForm = async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new'>Choose a pokemon!</a>`)
    }
    await pokeMaker.pokeMakerForms(req.body)
    
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/new/data`)
}

// CREATE DATA PAGE
const createPageData = async (req, res) => {
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
}

module.exports = {
    createPagePokemon, createPageForm, createPageData
}