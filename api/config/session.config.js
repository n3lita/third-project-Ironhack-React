require('dotenv').config();
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const MongoStore = connectMongo(expressSession);

const session = expressSession({
    secret: process.env.SESSION_SECRET || 'super secret (change it)',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.SESSION_SECURE || false,
        httpOnly: true,
        maxAge: 7 || 3600000,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 7 || 3600,
    })
});

module.exports = session;