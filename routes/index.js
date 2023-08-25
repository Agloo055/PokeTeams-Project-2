const router = require('express').Router()

const sessionCTRL = require('../controllers/sessions.js')
const userCTRL = require('../controllers/users.js')
const teamCTRL = require('../controllers/teams.js')
const pokemonRoute = require('./pokemon')

const isNotAuth = require("../middleware/isAuthorized.js").isNotAuth


//home route - only when not authentic

router.get('/', isNotAuth, (req, res) => {
    res.render('home.ejs')
})

//sessions route
router.use('/sessions', sessionCTRL)

//users route
router.use('/users', userCTRL)

//teams route
router.use('/users/:userID/teams', teamCTRL)

//pokemon route
router.use('/users/:userID/teams/:teamID/pokemon', pokemonRoute)

module.exports = router