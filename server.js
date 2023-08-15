require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoURI = process.env.MONGO_URI

// MIDDLEWARE

// MONGOOSE CONNECTION
mongoose.connect(mongoURI)
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo is disconnected'))

// ROUTES

//home route
app.get('/', (req, res) => {
    res.send('Home')
})

// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Server listening on PORT: ${PORT}...`)
})