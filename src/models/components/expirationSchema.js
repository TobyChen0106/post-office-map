const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expirationSchema = new Schema({
    beginDate: {
        type: String,
        default: "From now on",
    },
    endDate: {
        type: String,
        default: "End of the year",
    }
})

// const Expiration = mongoose.model('Expiration', ExpirationSchema);
module.exports = expirationSchema;