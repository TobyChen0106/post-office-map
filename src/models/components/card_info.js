const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardInfoSchema = new Schema({
    cardID: {
        type: String,
    },
    cardName: {
        type: String,
    }
})

module.exports = CardInfoSchema;