const clearPkmModel = require('./pokeMaker').clearPkmModel
const clearCurPkmModel = require('./pokeEditor').clearPkmModel

const isAuthenticated = (req, res, next) => {
    clearPkmModel()
    clearCurPkmModel()
    if(req.session.currentUser){
        next()
    }else {
        res.redirect('/')
    }
}

const isAuthenticatedNew = (req, res, next) => {
    clearCurPkmModel()
    if(req.session.currentUser){
        next()
    }else {
        res.redirect('/')
    }
}

const isAuthenticatedEdit = (req, res, next) => {
    clearPkmModel()
    if(req.session.currentUser){
        next()
    }else {
        res.redirect('/')
    }
}

const isNotAuthenticated = (req, res, next) => {
    clearPkmModel()
    clearCurPkmModel()
    const currentUser = req.session.currentUser
    if(currentUser){
        res.redirect(`/users/${currentUser._id}/teams`)
    }else {
        next()
    }
}



module.exports = {
    isAuth: isAuthenticated,
    isNotAuth: isNotAuthenticated,
    isAuthNew: isAuthenticatedNew,
    isAuthEdit: isAuthenticatedEdit
}