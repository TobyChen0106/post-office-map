const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    hsnCd: {
        type: String,
    },
    hsnNm: {
        type: String,
    },
    townCd: {
        type: String,
    },
})

const User = mongoose.model('User', UserSchema, "users");
module.exports = User;