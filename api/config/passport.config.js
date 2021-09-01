const passport = require('passport');
const mongoose = require('mongoose');
const Member = require('../models/member.model');
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((member, next) => {
    next(null, member.id)
});

passport.deserializeUser((id, next) => {
    Member.findById(id)
        .then(member => next(null, member))
        .catch(next)
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, next) => {
    Member.findOne({ email })
        .then(member => {
            if (!member) {
                next(null, null, { email: 'Invalid email or password' })
            } else {
                return member.checkPassword(password)
                    .then(match => {
                        if (match) {
                            next(null, member)
                        } else {
                            next(null, null, { email: 'Invalid email or password' })
                        }
                    })
            }
        }).catch(next)
}));