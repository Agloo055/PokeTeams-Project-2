const router = require('express').Router({mergeParams: true})
const {sessions} = require('../controllers')

const isNotAuth = require('../middleware/isAuthorized').isNotAuth

//NEW
router.get('/new', isNotAuth, sessions.newPage)

//CREATE
router.post('/', sessions.createPage)

//DELETE
router.delete('/', sessions.deletePage)

module.exports = router