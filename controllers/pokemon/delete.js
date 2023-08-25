const User = require('../../models/users')
const Team = require('../../models/teams').Team
const Pokemon = require('../../models/pokemon').Pokemon

const deletePage = async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const foundTeam = await Team.findById(req.params.teamID)
    const uPokemon = foundUser.teams.id(req.params.teamID).members.id(req.params.pokeID).deleteOne()
    const tPokemon = foundTeam.members.id(req.params.pokeID).deleteOne()
    const foundPokemon = await Pokemon.findByIdAndDelete(req.params.pokeID)
    await foundTeam.save()
    await foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.params.userID}/teams/${req.params.teamID}/`)
}

module.exports = {
    deletePage
}