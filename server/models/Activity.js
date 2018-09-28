const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
    title: {    
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Activity", activitySchema)