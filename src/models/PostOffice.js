const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostOfficeSchema = new Schema({
    hsnCd: {
        type: String,
    },
    hsnNm: {
        type: String,
    },
    townCd: {
        type: String,
    },
    townNm: {
        type: String,
    },
    storeCd: {
        type: String,
    },
    storeNm: {
        type: String,
    },
    addr: {
        type: String,
    },
    zipCd: {
        type: String,
    },
    tel: {
        type: String,
    },
    busiTime: {
        type: String,
    },
    busiMemo: {
        type: String,
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    nowCalling: {
        type: Number,
    },
    nowWaiting: {
        type: Number,
    },
    waitingUpdateTime: {
        type: String,
    },
    postDataUpdateTime: {
        type: String,
    },
    total: {
        type: Number,
    },
})

const PostOffice = mongoose.model('postoffice', PostOfficeSchema, "postoffices");
module.exports = PostOffice;