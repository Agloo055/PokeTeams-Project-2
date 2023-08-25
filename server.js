require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const path = require('path')
const mongoURI = process.env.MONGO_URI

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const routes = require('./routes/index')

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

app.use('/', routes)

//404 Error Route
app.use((req,res)=>{
    res.send('404 ERROR: PAGE NOT FOUND')
})

// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Server listening on PORT: ${PORT}...`)
})