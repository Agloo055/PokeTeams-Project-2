const router = require('express').Router({mergeParams: true})
const {pokemon} = require('../controllers')

const isAuth = require('../middleware/isAuthorized').isAuth
const isAuthNew = require('../middleware/isAuthorized').isAuthNew
const isAuthEdit = require('../middleware/isAuthorized').isAuthEdit

//INDUCES

//INDEX
router.get('/', isAuth, pokemon.indexPage)

//NEW
//POKEMON
router.get('/new/pokemon', isAuthNew, pokemon.newPage.newPagePokemon)
//FORM
router.get('/new/forms', isAuthNew, pokemon.newPage.newPageForm)
//DATA
router.get('/new/data', isAuthNew, pokemon.newPage.newPageData)


//DELETE
router.delete('/:pokeID', pokemon.deletePage.deletePage)

//UPDATE
//POKEMON
router.put('/:pokeID', pokemon.updatePage.updatePagePokemon)
//FORM
router.put('/:pokeID/form', pokemon.updatePage.updatePageForm)
//DATA
router.put('/:pokeID/data', pokemon.updatePage.updatePageData)

//CREATE
//POKEMON
router.post('/', pokemon.createPage.createPagePokemon)
//FORM
router.post('/new', pokemon.createPage.createPageForm)
//DATA
router.post('/new/data', pokemon.createPage.createPageData)

//EDIT
//POKEMON
router.get('/:pokeID/edit/pokemon', isAuthEdit, pokemon.editPage.editPagePokemon)
//FORM
router.get('/:pokeID/edit/form', isAuthEdit, pokemon.editPage.editPageForm)
//DATA
router.get('/:pokeID/edit/data', isAuthEdit, pokemon.editPage.editPageData)

//SHOW
router.get('/:pokeID', isAuth, pokemon.showPage.showPage)

module.exports = router