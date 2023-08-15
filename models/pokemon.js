const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    pokemon: {type: String, required: true},
    nickname: String,
    img: String,
    typing: [String]
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = {Pokemon, pokemonSchema}