const mongoose = require('mongoose');
const Schema = mongoose.Schema


const MessageSchema = new Schema({
    conversationId: {
        type: String,
    }, 
    sender: {
        type: String
    }, 
    text: {
        type: String
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

const Conversation = mongoose.model("Conversation", ConversationSchema)
module.exports = Conversation;