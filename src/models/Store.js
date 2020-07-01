const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    storeName: {
        type: String,
        required: true,
        unique: true
    },
    categories: {
        type:[String]
    },
    tags: {
        type:[String]
    },
    imageLink: {
        type: String
    },
    websiteLink: {
        type: String
    },
    numSearch:{
        type: Number,
        default: 0
    }
})

const Store = mongoose.model('store', StoreSchema);
module.exports = Store;