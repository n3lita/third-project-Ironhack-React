const mongoose = require("mongoose");
const Schema = mongoose.Schema

const meetupSchema = new Schema(
    {
        title: {
            type: String,
            required: "Please add a title",
        },
        text: {
            type: String,
            required: "Please add a description", 
            maxlength: 300
        },
        date: {
            type: Date,
            required: "Select a date", 
            default: Date.now()
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true
        }
    }, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    }
})

meetupSchema.virtual("subscribers", {
    ref: "Subscriber", 
    localField: "_id",
    foreignField: "meetup",
    count: true
});

meetupSchema.virtual("comments", {
    ref: "Comment", 
    localField: "_id",
    foreignField: "meetup", 
    justOne: false,
})

const Meetup = mongoose.model("Meetup", meetupSchema);
module.exports = Meetup;