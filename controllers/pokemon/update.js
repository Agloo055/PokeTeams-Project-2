const User = require('../../models/users')
const Team = require('../../models/teams').Team
const Pokemon = require('../../models/pokemon').Pokemon

const pokeEditor = require('../../middleware/pokeEditor')
const getPkmEdit = require('../../middleware/pokeEditor')

const updatePagePokemon = async (req, res) => {
    await pokeEditor.pokeEditor(req.body)
    
    const pkmSpecies = getPkmEdit.getPkmSpecies()
    if(pkmSpecies.varieties.length > 1){
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/form`)
    } else {
        res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/data`)
    }
}

const updatePageForm = async (req, res) => {
    if(req.body.pokemon === ""){
        res.send(`<a href='/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}'>Choose a pokemon!</a>`)
    }
    await pokeEditor.pokeEditorForms(req.body)
    
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}/pokemon/${req.params.pokeID}/edit/data`)
}

const updatePageData = async (req, res) => {
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
}

module.exports = {
    updatePagePokemon, updatePageForm, updatePageData
}