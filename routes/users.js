const router = require('express').Router({mergeParams: true})
const {users} = require('../controllers')

const isNotAuth = require('../middleware/isAuthorized').isNotAuth

//NEW
router.get('/new', isNotAuth, users.newPage)

//CREATE
router.post('/', users.createPage)

module.exports = router