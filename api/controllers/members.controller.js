const mongoose = require("mongoose")
const createError = require('http-errors');
const Member = require('../models/member.model')


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
    
}