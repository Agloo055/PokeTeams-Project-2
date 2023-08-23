const ROOT_URL = process.env.ROOT_URL

//Globals
let pkmSpecies
let pkmMain
const pkmModel = {}

const pokeMaker = async (pkmMdl) => {
    clearPkmModel()

    const pkm = pkmMdl.pokemon.split(' ')
    pkmModel.num = Number(pkm[0])
    pkmModel.pokemon = pkm[1]

    pkmMdl.nickname ? pkmModel.nickname = pkmModel.nickname : pkmModel.nickname = pkmModel.pokemon

    pkmSpecies = await fetch(`${ROOT_URL}/pokemon-species/${pkmModel.num}`)
        .then((res) => res.json())
    pkmMain = await fetch(`${ROOT_URL}/pokemon/${pkmModel.num}`)
        .then((res) => res.json())

    return pkmModel
} 

const pokeMakerForms = async (pkmMdl) => {
    let formUrl
    pkmSpecies.varieties.forEach(async (form) => {
        if(form.pokemon.name === pkmMdl.form && !form.is_default){
            formUrl = form.pokemon.url
        }
    })
    pkmMain = await fetch(formUrl)
        .then((res) => res.json())
        
    return pkmModel
}

const pokeMakerData = (pkmMdl) => {

    pkmModel.img = pkmMain.sprites.front_default
    pkmModel.typing = []
    pkmMain.types.forEach((type) => {
        pkmModel.typing.push(type.type.name)
    })

    pkmModel.baseStats = {
        hp: 0,
        atk: 0,
        def: 0,
        spA: 0,
        spD: 0,
        spe: 0,
        bst: 0
    }
    let statInd = 0
    for(let stat in pkmModel.baseStats){
        if(stat !== "bst"){
            pkmModel.baseStats[stat] = pkmMain.stats[statInd].base_stat
            pkmModel.baseStats.bst += pkmMain.stats[statInd].base_stat
            statInd++
        }
    }

    return pkmModel
}

const getPkmModel = () => {
    return pkmModel
}

const getPkmMain = () => {
    return pkmMain
}

const getPkmSpecies = () => {
    return pkmSpecies
}

const clearPkmModel = () => {
    for (data in pkmModel) {
        delete pkmModel[data]
    }
}

module.exports = {pokeMaker, pokeMakerForms, pokeMakerData,
     getPkmModel, getPkmMain, getPkmSpecies, 
     clearPkmModel}