const mongoose= require('mongoose')
const createError = require('http-errors')
const Meetup = require('../models/meetup.model')

module.exports.create = (req, res, next) => {
    const data = { title, meetupDescription, meetupDate } = req.body

    Meetup.create({
        ...data, 
        meetupAuthor: req.member.id
    })

.then(meetup => res.status(201).json(meetup))
.catch(next)
}