const mongoose = require('mongoose')
const createError = require('http-errors')
const Member = require('../models/member.model')
const Conversation = require('../models/conversation.model')

module.exports.create = (req, res, next) => {
Conversation.create({ 
    participants: [req.user.id, req.params.receiverId]
})
.then(conversation => res.status(201).json(conversation))
.catch(next)
}

module.exports.list = (req, res, next) => {
    Conversation.find({$in: [req.user.id]})
    .then(result => res.json(result))
}

