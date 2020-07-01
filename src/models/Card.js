const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema({
    updateTime: {
        type: String,
        required: true
    },
    updateSource: {
        type: String,
        required: true
    },
})

const CardSchema = new Schema({
    cardID: {
        type: String,
        required: true,
        unique: true
    },
    cardName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true,
        default: "台新銀行"
    },
    imageUrl: {
        type: String,
    },
    imageRotate: {
        type: Boolean,
    },
    imageLocal: {
        type: String,
    },
    offers: {
        type: [String],
        required: true
    },
    note: {
        type: Note,
        // required: true
    }
})

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;