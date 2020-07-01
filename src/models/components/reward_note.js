const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    values: {
        type: Number,
        default: 0
    },
    sentences: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    }
})

module.exports = NoteSchema;