const mongoose = require('mongoose');
const Schema = mongoose.Schema


const MeetupCommentSchema = new Schema({
    text: String, 
    author: {
type: mongoose.Schema.Types.ObjectId, 
ref: 'Member', 
required: true
    }, 
    meetup: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Meetup',
        required: true
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

const Comment = mongoose.model("Conversation", MeetupCommentSchema)
module.exports = Comment;