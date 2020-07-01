const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    userName: {
        type: String,
    },
    userID: {
        type: String,
    },
    userImage: {
        type: String,
    },
    content: {
        type: String,
        default: "",
    },
    showStatus: {
        type: Boolean,
        default: true
    },
    time: {
        type: String,
    }
});

const UserLikes = new Schema({
    userID: {
        type: String,
    },
    like: {
        type: Boolean,
    }
});

const UserFavos = new Schema({
    userID: {
        type: String,
    },
    favo: {
        type: Boolean,
    }
});

const CommentSchema = new Schema({
    offerID: {
        type: String,
        required: true,
        unique: true
    },
    comments: {
        type: [CommentsSchema],
        default: []
    },
    userLikes: {
        type: [UserLikes],
        default: []
    },
    userFavos: {
        type: [UserFavos],
        default: []
    },
})

const Comment = mongoose.model('Comment', CommentSchema, "comments");
module.exports = Comment;