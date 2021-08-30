const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;
const interests = require('../data/interests.json')

const memberSchema = new Schema({
    name: {
        type: String, 
        required: 'Name is required'
    },
    age: {
        type: String, 
        required: 'Age is required'
    },
    password: {
        type: String, 
        required: 'Password is required',
        match: [PASSWORD_PATTERN, 'password needs at least 8 characters']
    },
    interests: {
        type: String, 
        enum: interests
    },
    city: {
        type: String, 
        required: "The City is required"
    }
}, {
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret.__id;
            delete ret.__v;
            delete ret.password;
            return ret
        }
    }
})

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;