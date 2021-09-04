require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');

require('./config/passport.config');
require('./config/db.config');
const cors = require('./config/cors.config');
const session = require('./config/session.config');

const app = express();

/** Middlewares */
app.use(logger('dev'));
app.use(session);
app.use(cors);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

/** Routes */
const routes = require('./config/routes.config');
app.use('/api', routes);

/** Error Handling */

app.use((req, res, next) => next(createError(404, 'Route not found')))

app.use((error, req, res, next) => {
    if(error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error)
    } else if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
        error = createError(404, 'Resource not found');
    } else if (error.message.includes('E11000')) {
        error = createError(409, 'Duplicated')
    } else if (!error.status) {
        error = createError(500, error)
    }

    if (error.status >= 500) {
        console.error(error)
    }

    const data = {}
    data.message = error.message; 
    if (error.errors) {
        console.log(error.errors)
        data.errors = Object.keys(error.errors)
        .reduce((errors, key) => {
            errors[key] = error.errors[key].message;
            return errors;
        }, {})
    }
    console.log('data', data)
    res.status(error.status).json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running at port ${port}`))