const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    //Page 1
    pokemon: {type: String, required: true},
    num: {type: Number, required: true},
    nickname: String,
    //Page 2
    form: String,
    typing: [String],
    baseStats: {
        hp: Number,
        atk: Number,
        def: Number,
        spA: Number,
        spD: Number,
        spe: Number,
        bst: Number
    },
    weight: Number,
    height: Number,
    //Page 3
    img: String,
    isShiny: Boolean,
    moves: [String],
    ability: String,
    evs: {
        hp: Number,
        atk: Number,
        def: Number,
        spA: Number,
        spD: Number,
        spe: Number
    },
    ivs: {
        hp: Number,
        atk: Number,
        def: Number,
        spA: Number,
        spD: Number,
        spe: Number
    }
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = {Pokemon, pokemonSchema}