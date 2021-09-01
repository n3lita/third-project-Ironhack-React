const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createError(401, 'Member is not authenticated'))
    }
};

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(createError(403, 'Member is authenticated'))
    }else {
        next()
    }
}