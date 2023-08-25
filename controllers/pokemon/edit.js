const Team = require('../../models/teams').Team

const genMaker = require('../../middleware/genMaker')

const getPkmEdit = require('../../middleware/pokeEditor')
const setPkm = require('../../middleware/pokeEditor').setPkmModel

const editPagePokemon = async (req, res) => {
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
}

const editPageForm = (req, res) => {
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
}

const editPageData = (req, res) => {
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
}

module.exports = {
    editPagePokemon, editPageForm, editPageData
}