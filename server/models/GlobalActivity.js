const mongoose = require('mongoose')
const Schema = mongoose.Schema

const globalActivitySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("GlobalActivity", globalActivitySchema)