const router = require('express').Router({mergeParams: true})
const User = require('../models/users')
const Team = require('../models/teams').Team
const genMaker = require('../middleware/genMaker')
const { Pokemon } = require('../models/pokemon')
const isAuth = require('../middleware/isAuthorized').isAuth

// INDUCES

// INDEX
const indexPage = async (req, res) => {
    if(!genMaker.genPokemon.length) await genMaker.genMaker()
    res.render('teams/index.ejs', {
        currentUser: req.session.currentUser
    })
}

// NEW - STRETCH GOAL
const newPage = (req, res) => {
    res.render('teams/new.ejs', {
        currentUser: req.session.currentUser
    })
}

// DELETE - STRETCH GOAL
const deletePage = async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    const team = foundUser.teams.id(req.params.teamID).deleteOne()
    const foundTeam = await Team.findByIdAndDelete(req.params.teamID)
    foundUser.save()

    foundTeam.members.forEach(async (pokemon) => {
        await Pokemon.findByIdAndDelete(pokemon._id)
    })

    req.session.currentUser = foundUser
    res.redirect(`/users/${req.params.userID}/teams/`)
}

// UPDATE - STRETCH GOAL
const updatePage = async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    if(!req.body.nickname) req.body.nickname = `team${foundUser.teams.length}`

    const foundTeam = await Team.findByIdAndUpdate(req.params.teamID, req.body, {new: true})
    const team = foundUser.teams.id(req.params.teamID)
    foundUser.teams.splice(foundUser.teams.indexOf(team), 1, foundTeam)
    await foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.session.currentUser._id}/teams/${req.params.teamID}`)
}

// CREATE - STRETCH GOAL
const createPage = async (req, res) => {
    const foundUser = await User.findById(req.params.userID)
    if(!req.body.nickname) req.body.nickname = `team${foundUser.teams.length+1}`
    const team = await Team.create(req.body)
    foundUser.teams.push(team)
    foundUser.save()
    req.session.currentUser = foundUser
    res.redirect(`/users/${req.session.currentUser._id}/teams/`)
}

// EDIT - STRETCH GOAL
const editPage = async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamID)

    res.render('teams/edit.ejs', {
        currentUser: req.session.currentUser,
        team: foundTeam
    })
}

// SHOW
const showPage = async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamID)

    res.render('teams/show.ejs', {
        currentUser: req.session.currentUser,
        team: foundTeam
    })
}

module.exports = {
    indexPage,
    newPage,
    deletePage,
    updatePage,
    createPage,
    editPage,
    showPage
}