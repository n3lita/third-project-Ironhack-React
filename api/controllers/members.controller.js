const mongoose = require("mongoose")
const createError = require('http-errors');
const Member = require('../models/member.model');


module.exports.create = (req, res, next) => {
    Member.findOne({ email: req.body.email })
        .then(member => {
            if (member) {
                next(createError(400, { errors: { email: 'This user already exists' } }))
            } else {
                return Member.create(req.body)
                    .then(member => res.status(201).json(member))
            }
        })
        .catch(next)
}

module.exports.list = (req, res, next) => {
    Member.find()
        .then(members => res.json(members))
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    res.json(req.member)
}

module.exports.edit = (req, res, next) => {
    const data = { name, age, profilePicture, interests } = req.body;
    const member = req.member;
    Object.assign(member, data);
    member.save()
        .then(member => res.json(member))
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Member.deleteOne({_id: req.member.id})
    .then(() => res.status(204).send())
    .catch(error => next(error))
}