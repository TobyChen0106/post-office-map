const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreRecordSchema = new Schema({
    storeName: {
        type: String,
        unique: true,
    },
    numSearch: {
        type: Number,
        default: 0,
    }
})
module.exports = StoreRecordSchema