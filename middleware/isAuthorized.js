const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    }else {
        console.log(`Not Authenticated`)
        res.redirect('/')
    }
}

const isNotAuthenticated = (req, res, next) => {
    const currentUser = req.session.currentUser
    if(currentUser){
        console.log(currentUser.username)
        //res.redirect('/')
        next()
    }else {
        next()
    }
}



module.exports = {
    isAuth: isAuthenticated,
    isNotAuth: isNotAuthenticated
}