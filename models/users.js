const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = require('./teams.js').teamSchema

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    teams: {type: [teamSchema], default:[]}
})

const User = mongoose.model('User', userSchema)

module.exports = User