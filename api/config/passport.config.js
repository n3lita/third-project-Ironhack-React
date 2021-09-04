const passport = require('passport');
const mongoose = require('mongoose');
const Member = require('../models/member.model');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.use('google-auth', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/authenticate/google/cb',
  }, (accessToken, refreshToken, profile, next) => {
    const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

    if (googleId && name && email) {
        Member.findOne({ $or: [
            { email }, 
            { 'social.google' : googleId}
        ]})
        .then(member => {
            if(!member) {
                member = new Member({
                    name,
                    email, 
                    profilePicture: profile.photos[0].value,
                    password: mongoose.Types.ObjectId(),
                    social: {
                        google: googleId
                    } 
                }); 
                return member.save()
                .then(member => next(null, member))
            } else {
                next(null, member)
            }
        })
        .catch(next)
    } else {
        next(null, null, { oauth: 'invalid google oauth response'})
    }
}));