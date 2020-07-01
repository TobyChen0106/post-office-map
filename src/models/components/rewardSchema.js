const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rewardSchema = new Schema({
    // 優惠內容
    contents: {                // details of an offer written in markdown
        type: String,
        default: "",
    },
    // 優惠使用限制
    limits: {                  // limitation on the usage of an offer        
        type: [String],
        default: "Unlimited"
    },
    // 何時可以使用優惠
    timingToOffer: {           // when an offer can be used
        type: String,
        default: ""
    },
    // 何地可以使用優惠
    places: {                  // where an offer can be used
        type: [String]
    },
    // 其他備註
    notes: {
        type: String,
        default: ""
    }
})

// const Expiration = mongoose.model('Expiration', ExpirationSchema);
module.exports = rewardSchema;