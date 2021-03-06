const mongoose = require("mongoose");
const Schema = mongoose.Schema

const meetupSubscriberSchema = new Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    meetup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meetup",
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

const Subscriber = mongoose.model("Subscriber", meetupSubscriberSchema);
module.exports = Subscriber;