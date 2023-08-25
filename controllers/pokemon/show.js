const Team = require('../../models/teams').Team

const showPage = async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamID)
    const foundPokemon = foundTeam.members.id(req.params.pokeID)
    res.render('pokemon/show.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        pokemon: foundPokemon
    })
}

module.exports = {
    showPage
}