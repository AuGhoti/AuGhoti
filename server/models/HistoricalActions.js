const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historicalActionSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    activityId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("HistoricalAction", historicalActionSchema)