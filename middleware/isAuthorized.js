const clearPkmModel = require('./pokeMaker').clearPkmModel

const isAuthenticated = (req, res, next) => {
    clearPkmModel()
    if(req.session.currentUser){
        next()
    }else {
        console.log(`Not Authenticated`)
        res.redirect('/')
    }
}

const isAuthenticatedPoke = (req, res, next) => {
    if(req.session.currentUser){
        next()
    }else {
        console.log(`Not Authenticated`)
        res.redirect('/')
    }
}

const isNotAuthenticated = (req, res, next) => {
    clearPkmModel()
    const currentUser = req.session.currentUser
    if(currentUser){
        console.log(currentUser._id)
        res.redirect(`/users/${currentUser._id}/teams`)
    }else {
        next()
    }
}



module.exports = {
    isAuth: isAuthenticated,
    isNotAuth: isNotAuthenticated,
    isAuthPoke: isAuthenticatedPoke
}