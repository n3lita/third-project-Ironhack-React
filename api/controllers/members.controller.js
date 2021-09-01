const mongoose = require("mongoose")
const createError = require('http-errors');
const Member = require('../models/member.model');
const passport = require('passport')


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
    const data = { name, age, profilePicture, interests, description } = req.body;
    const member = req.member;
        if (req.body.memberId === member.id || req.body.isAdmin) {
            Object.assign(member, data);
            member.save()
                .then(member => res.json(member))
        } else {
            return res.status(403, "You can only update your account!")
        }
}

module.exports.delete = (req, res, next) => {
    Member.deleteOne({ _id: req.member.id })
        .then(() => res.status(204).send())
        .catch(error => next(error))
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, member, validations) => {
        if (error) {
            next(error);
        } else if (!member) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(member, error => {
                if (error) next(error)
                else res.json(member)
            })
        }
    })(req, res, next)
};

module.exports.logout = (req, res, next) => {
    req.logout()
    res.status(204).end()
}