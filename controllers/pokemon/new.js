const getPkm = require('../../middleware/pokeMaker')

const genMaker = require('../../middleware/genMaker')

const newPagePokemon = (req, res) => {
    const genPokemon = genMaker.genPokemon

    res.render('pokemon/new.ejs', {
        currentUser: req.session.currentUser,
        teamID: req.params.teamID,
        genPokemon: genPokemon
    })
}

const newPageForm = (req, res) => {
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
}

const newPageData = (req, res) => {
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
}

module.exports = {
    newPagePokemon, newPageForm, newPageData
}