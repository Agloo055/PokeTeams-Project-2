const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemonSchema = require('./pokemon').pokemonSchema

const teamSchema = new Schema({
    nickname: {type: String, required: true},
    members: {type: [pokemonSchema], default:[]}
})

const Team = mongoose.model('Team', teamSchema)

module.exports = {Team, teamSchema}