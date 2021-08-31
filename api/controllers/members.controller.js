const mongoose = require("mongoose")
const createError = require('http-errors');
const Member = require('../models/member.model');
const { create } = require("../models/member.model");


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
    Member.findById(req.params.id)
    .then(member => {
        if(!member) {
            next(createError(404, 'Member not found'))
        }else{
            res.json(member)
        }
    })
}

/* module.exports.edit = (req, res, next) => {
    const data = { name, age } = req.body;
    const member = req.member;
        Member.findByIdAndUpdate(req.params.id, data, {new: true, runValidators: true})
    Object.assign(member, data);
    member.save()
        .then(member => res.json(member))
        .catch(error => next(error))
} */

 module.exports.edit = (req, res, next) => {
     const data = { name, age, profilePicture, interests } = req.body
    Member.findByIdAndUpdate(req.params.id, data, {new: true, runValidators: true})
    .then(member => {
        if(!member) {
            next(createError(404,"Member not found"))
        } else {
            res.json(member)
        }
    })
    .catch(error => next(error))
}
