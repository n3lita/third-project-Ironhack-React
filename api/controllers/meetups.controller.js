const mongoose = require("mongoose")
const createError = require("http-errors")
const Meetup = require("../models/meetup.model");
const Subscriber = require("../models/meetupSubscriber.model");
const Comment = require("../models/meetupcomment.model")

module.exports.create = (req, res, next) => {
    const data = { title, meetupDescription, meetupDate } = req.body
    Meetup.create({
        ...data,
        author: req.user.id //logged in member
    })
        .then(meetup => res.status(201).json(meetup))
        .catch(next)
};

module.exports.list = (req, res, next) => {
    Meetup.find()
        .populate("author")
        .populate("comments")
        .populate("subscribers")
        .then(meetups => res.json(meetups))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Meetup.findById(req.params.meetupId)
        .then(meetup => res.status(200).json(meetup))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    const data = { title, text, date, time } = req.body
    Meetup.findOneAndDelete({
        _id: req.params.meetupId,
        author: req.user.id
    })
        .then(meetup => {
            if (meetup) {
                res.status(204).end()
            } else {
                next(createError(404, "meetup not found"))
            }
        })
        .catch(next)
}

module.exports.edit = (req, res, next) => {
    const data = { title, text, date, time } = req.body

    Meetup.findByIdAndUpdate(req.params.meetupId, data, { new: true })
        .then(meetup => {
            console.log("meetup", meetup)
            res.status(202).json(meetup)
        })
        .catch(next)
}

module.exports.subscribe = (req, res, next) => {
    const data = {
        meetup: req.params.meetupId,
        member: req.user.id
    }
    Subscriber.findOne(data)
        .then(subscribe => {
            if (subscribe) {
                subscribe.delete()
                    .then(() => res.status(204).end()) /* if already subscribed, remove */
                    .catch(next)
            } else {
                Subscriber.create(data)
                    .then(subscribe => res.status(201).json(subscribe))
                    .catch(next)
            }
        })
        .catch(next)
}


module.exports.createComment = (req, res, next) => {
    Comment.create({
        text: req.body.text,
        author: req.user.id,
        meetup: req.params.meetupId
    })
        .then(meetup => res.status(201).json(meetup))
        .catch(next)
}