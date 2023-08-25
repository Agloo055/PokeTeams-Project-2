const indexPage = (req, res) => {
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
}

module.exports = {
    indexPage,
    newPage: require('./new'),
    deletePage: require('./delete'),
    updatePage: require('./update'),
    createPage: require('./create'),
    editPage: require('./edit'),
    showPage: require('./show')
}