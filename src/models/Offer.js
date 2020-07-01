const mongoose = require('mongoose')
const ExpirationSchema = require('./components/expiration')
const CardInfoSchema = require('./components/card_info')
const NoteSchema = require('./components/reward_note')
const Schema = mongoose.Schema

const RewardSchema = new Schema({
    contents: {
        type: String,
        default: "",
    },
    limits: {
        type: String,
        default: ""
    },
    timingToOffer: {
        type: String,
        default: ""
    },
    places: {
        type: [String]
    },
    notes: {
        type: NoteSchema,
    }
})

const ConstraintSchema = new Schema({
    userIdentity: {
        type: String,
        default: ""
    },
    timingOfConsumption: {
        type: String,
        default: ""
    },
    channels: {
        type: String,
        default: ""
    },
    amounts: {
        type: String,
        default: ""
    },
    numberOfConsumption: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },    
    others: {
        type: String,
        default: ""
    }
})

const OfferSchema = new Schema({
    offerID: {
        type: String,
        required: true,
        unique: true
    },
    offerName: {
        type: String,
        default: ""
    },
    bankName: {
        type: String,
        default: ""
    },
    cardInfo: {
        type: [CardInfoSchema]
    },
    provider: {
        type: String,
        default: "卡伯"
    },
    expiration: {
        type: ExpirationSchema,
    },
    offerAbstract: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true,
        enum: ['國內一般消費', '國外一般消費', '交通', '食宿', '娛樂', '保險', '其他'],
        default: "國內一般消費",
    },
    tags: {
        type:[String]
    },
    numSearch:{
        type: Number,
        default: 0
    },
    reward: {
        type: RewardSchema,
    },
    constraint: {
        type: ConstraintSchema
    },
    link: {
        type: String,
        default: ''
    },
})

const Offer = mongoose.model('offer', OfferSchema);
module.exports = Offer;