const mongoose = require("mongoose");
const Schema = mongoose.Schema


const ConversationSchema = new Schema({
    participants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, 
            Ref: "Member"
        }],
        
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret
        }
    }
})
ConversationSchema.virtual("messages", {
    ref:"Message", 
    localField: "_id", 
    foreignField: "conversationId",
    justOne: false,
})


const Conversation = mongoose.model("Conversation", ConversationSchema)
module.exports = Conversation;