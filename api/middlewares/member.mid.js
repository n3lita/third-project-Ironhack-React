const createError = require("http-errors");
const Member = require("../models/member.model");

module.exports.exists = (req, res, next) => {
    const id = req.params.memberId || req.params.id

    if (req.params.memberId === 'me') {
       return res.json(req.user)
    } else {
        Member.findById(id)
        .then(member => {
            if (member) {
                req.member = member;
                next();
            } else {
                next(createError(404, "Member not found"))
            }
        })
        .catch(next)
    } 

}