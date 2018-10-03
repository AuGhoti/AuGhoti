const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalActivitySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("GlobalActivity", globalActivitySchema);