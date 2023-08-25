const router = require('express').Router({mergeParams: true})
const {teams} = require('../controllers')

const isAuth = require('../middleware/isAuthorized').isAuth

//INDUCES

//INDEX
router.get('/', isAuth, teams.indexPage)

//NEW
router.get('/new', isAuth, teams.newPage)

//DELETE
router.delete('/:teamID', teams.deletePage)

//UPDATE
router.put('/:teamID', teams.updatePage)

//CREATE
router.post('/', teams.createPage)

//EDIT
router.get('/:teamID/edit', isAuth, teams.editPage)

//SHOW
router.get('/:teamID', isAuth, teams.showPage)

module.exports = router