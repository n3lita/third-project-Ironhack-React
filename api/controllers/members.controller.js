const mongoose = require("mongoose")
const createError = require("http-errors")
const Member = require("../models/member.model")
const passport = require("passport")

module.exports.list = (req, res, next) => {
    const criterial = {};

    const { interests } = req.query;
   // console.log(req.query);
    if (interests) {
        criterial.interests = { $in: interests };
    }

    Member.find(criterial)
            .then(members => res.json(members))
            .catch(next);
};

module.exports.detail = (req, res, next) => {
    res.json(req.member);
};

module.exports.edit = (req, res, next) => {
    const data = { name, age, description, interests} = req.body;
    const member = req.member;

    if (req.file) {
        data.profilePicture = req.file.path
    }

    Member.findByIdAndUpdate(member.id, data, {new: true})
        .then(member => res.status(202).json(member))
        .catch(error => next(error))
};

module.exports.delete = (req, res, next) => {
    Member.deleteOne({ _id: req.member.id })
        .then(() => res.status(204).send())
        .catch(next);
};


//AUTH

module.exports.register = (req, res, next) => {
    console.log(req.file)
    Member.findOne({ email: req.body.email })
        .then(member => {
            if (member) {
                next(createError(400, { errors: { email: { message: "This user already exists" } } }))
            } else {
                return Member.create({
                    ...req.body, 
                profilePicture: req?.file?.path
            })
                    .then(member => res.status(201).json(member))
            }
        })
        .catch(next);
};

module.exports.login = (req, res, next) => {
    passport.authenticate("local-auth", (error, member, validations) => {
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
    })(req, res, next);
};

module.exports.logout = (req, res, next) => {
    req.logout()
    res.status(204).end();
};

module.exports.loginWithGoogle = (req, res, next) => {
    const passportController = passport.authenticate("google-auth", {
        scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    });
    passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
    const passportController = passport.authenticate("google-auth", (error, user, validations) => {
        if (error) {
            next(error);
        } else {
            req.login(user, error => {
                if (error) {
                    next(error)
                } else {
                    res.redirect(`${process.env.REACT_APP_URL}/google/cb`)
                }
            })
        }
    })
    passportController(req, res, next);
}