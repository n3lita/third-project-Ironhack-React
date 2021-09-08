const mongoose = require("mongoose")
const createError = require("http-errors")
const Member = require("../models/member.model")
const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")

module.exports.create = (req, res, next) => {
Conversation.create({ 
    participants: [req.user.id, req.params.receiverId]
})
.then(conversation => res.status(201).json(conversation))
.catch(next)
}

module.exports.list = (req, res, next) => {
    Conversation.find({$in: [req.user.id]})
    .populate("messages")
    .then(conversation => res.status(200).json(conversation))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
    Conversation.findByIdAndUpdate(req.params.conversationId, {$pull: {"participants" : req.user.id}}, {new: true})
    .then(() => res.status(204).end())
    .catch(next)
}

module.exports.detail = (req, res, next) => {
    Conversation.findById(req.params.conversationId)
    .populate("messages")
    .then(conversation => res.status(200).json(conversation))
    .catch(next)
}

module.exports.createMessage = (req, res, next) => {
    Message.create({
        conversationId: req.params.conversationId, 
        sender: req.user.id, 
        text: req.body.text
    })
    .then(conversation => res.status(201).json(conversation))
    .catch(next)
}
