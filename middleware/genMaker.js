const ROOT_URL = process.env.ROOT_URL

const genPokemon = []

const genMaker = async () => {
    const generations = await fetch(`${ROOT_URL}/pokedex/1`)
        .then((res) => res.json())
    generations.pokemon_entries.forEach((pokemon) => {
        const pk = {}
        pk.num = pokemon.entry_number
        pk.name = pokemon.pokemon_species.name
        genPokemon.push(pk)
    })

}

module.exports = {genMaker, genPokemon}