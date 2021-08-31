const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;
const interests = require('../data/interests.json')
const bcrypt = require('bcrypt')

const memberSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true
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
    profilePicture: {
        type: String,
        default: ""
    },
    interests: {
        type: [{
            type: String,
            enum: interests.map((i) => i.id)
        }],
        validate: {
            validator: function (interests) {
                return interests.length >= 1;
            },
            message: 'Choose at least one interest'
        }
    },
    city: {
        type: String,
        required: "The City is required"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;

            return ret
        }
    },
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

memberSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

memberSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;