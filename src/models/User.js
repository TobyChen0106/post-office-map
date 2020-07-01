const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OfferRecordSchema = require("./components/offer-record")
const StoreRecordSchema = require("./components/store-record")

const UserSchema = new Schema({
    lineID: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
    },
    nickName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    cards:{
        // cardID
        type: [String],
        default: undefined,
    },
    favoriteStores:{
        type: [StoreRecordSchema],
        default: [],
    },
    favoriteOffers:{
        type: [OfferRecordSchema],
        default: [],
    }
})

const User = mongoose.model('User', UserSchema, "users");
module.exports = User;