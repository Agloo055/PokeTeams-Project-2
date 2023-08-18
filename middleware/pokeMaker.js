const ROOT_URL = process.env.ROOT_URL

const pokeMaker = async (pkmModel) => {
    const pkm = pkmModel.pokemon.split(' ')
    pkmModel.num = Number(pkm[0])
    pkmModel.pokemon = pkm[1]

    if(!pkmModel.nickname) pkmModel.nickname = pkmModel.pokemon

    const pkmSpecies = await fetch(`${ROOT_URL}/pokemon-species/${pkmModel.num}`)
        .then((res) => res.json())
    const pkmMain = await fetch(`${ROOT_URL}/pokemon/${pkmModel.num}`)
        .then((res) => res.json())
    
    pkmModel.img = pkmMain.sprites.front_default
    pkmModel.typing = []
    pkmMain.types.forEach((type) => {
        pkmModel.typing.push(type.type.name)
    })

    return pkmModel
}

module.exports = pokeMaker