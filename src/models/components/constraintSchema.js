const mongoose = require('mongoose')
const Schema = mongoose.Schema

const constraintSchema = new Schema({
    // 持卡人身份
    userIdentity: {
        type: String,
        default: ""
    },
    // 必須在何時有消費
    timingOfConsumption: {     // when does the transaction take place
        type: String,
        default: ""
    },
    // 必須在何地有消費
    channels: {                // where does the transaction take place
        type: [String]
    },
    // 必須消費多少金額
    amounts: {                 // amount of the expense on the transaction
        type: [String]
    },
    // 必須消費幾次
    numberOfConsumption: {     // number of transactions
        type: Number,
        default: 0
    },
    // 必須以何種消費類型
    type: {                    // may be deprecated and replaced by categories
        type: String,
        default: ""
    },
    // 其他限制條件
    others: {
        type: [String]
    }
})

// const Expiration = mongoose.model('Expiration', ExpirationSchema);
module.exports = constraintSchema;