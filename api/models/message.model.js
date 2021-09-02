const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('../models/conversation.model')
require('../models/member.model')

const MessageSchema = new Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    }, 
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    }, 
    text: {
        type: String, 
        required: true, 
        minlength: 1
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
    }
})


const Message = mongoose.model("Message", MessageSchema)
module.exports = Message;