const ROOT_URL = process.env.ROOT_URL
let pkmSpecies
let pkmMain

const pokeMaker = async (pkmModel) => {
    const pkm = pkmModel.pokemon.split(' ')
    pkmModel.num = Number(pkm[0])
    pkmModel.pokemon = pkm[1]

    if(!pkmModel.nickname) pkmModel.nickname = pkmModel.pokemon

    pkmSpecies = await fetch(`${ROOT_URL}/pokemon-species/${pkmModel.num}`)
        .then((res) => res.json())
    pkmMain = await fetch(`${ROOT_URL}/pokemon/${pkmModel.num}`)
        .then((res) => res.json())
    
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

module.exports = pokeMaker