const router = require('express').Router()

const sessionRoute = require('./sessions')
const userCTRL = require('../controllers/users.js')
const teamRoute = require('./teams')
const pokemonRoute = require('./pokemon')

const isNotAuth = require("../middleware/isAuthorized").isNotAuth


//home route - only when not authentic

router.get('/', isNotAuth, (req, res) => {
    res.render('home.ejs')
})

//sessions route
router.use('/sessions', sessionRoute)

//users route
router.use('/users', userCTRL)

//teams route
router.use('/users/:userID/teams', teamRoute)

//pokemon route
router.use('/users/:userID/teams/:teamID/pokemon', pokemonRoute)

module.exports = router