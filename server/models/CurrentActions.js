const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currentActionSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    activityTitle: {
        type: String,
        ref: "Activity",
        required: true
    },
    activityId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("CurrentAction", currentActionSchema)