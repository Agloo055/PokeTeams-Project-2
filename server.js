require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoURI = process.env.MONGO_URI

// MIDDLEWARE
const sessionCTRL = require('./controllers/sessions.js')
const userCTRL = require('./controllers/users.js')

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// MONGOOSE CONNECTION
mongoose.connect(mongoURI)
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo is disconnected'))

// ROUTES

//home route - only when not authentic
const isNotAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        console.log(currentUser.username)
    }else {
        next()
    }
}

app.get('/', isNotAuthenticated, (req, res) => {
    res.render('home.ejs')
})

//sessions route
app.use('/sessions', sessionCTRL)

//users route
app.use('/users', userCTRL)

//404 Error Route
app.use((req,res)=>{
    res.send('404 ERROR: PAGE NOT FOUND')
})

// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Server listening on PORT: ${PORT}...`)
})