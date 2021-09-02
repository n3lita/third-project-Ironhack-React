const mongoose = require('mongoose');
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
            required: "Select a date"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member',
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

schema.virtual('suscribers', {
    ref: 'Suscriber', 
    localField: '_id',
    foreignField: 'meetup',
    count: true
});

const Meetup = mongoose.model('Meetup', meetupSchema);
module.exports = Meetup;