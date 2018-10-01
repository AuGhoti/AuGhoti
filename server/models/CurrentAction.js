const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        required: true
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("CurrentAction", currentActionSchema);