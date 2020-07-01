const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferRecordSchema = new Schema({
    offerID: {
        type: String,
        // required: true
        unique: true
    },
    numSearch: {
        type: Number,
        default: 0
    }
})
module.exports = OfferRecordSchema