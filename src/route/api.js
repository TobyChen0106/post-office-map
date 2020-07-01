const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const Offer = require('../models/Offer');
const Store = require('../models/Store');
const Comment = require('../models/Comment');

router.post('/append-comment-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });
            new_comment.comments.push(req.body.new_comments);
            new_comment.save().then(() => {
                res.json("Comment Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            data.comments.push(req.body.new_comments)
            data.save().then(() => {
                res.json("Comment Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.post('/save-like-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });

            new_comment.userLikes.push(req.body);
            new_comment.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            var pre_like = data.userLikes.findIndex(el => el.userID === req.body.userID);
            if (pre_like !== -1) {
                data.userLikes[pre_like].like = req.body.like;
            } else {
                data.userLikes.push(req.body);
            }
            data.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.post('/save-favo-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });

            new_comment.userFavos.push(req.body);
            new_comment.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            var pre_like = data.userFavos.findIndex(el => el.userID === req.body.userID);
            if (pre_like !== -1) {
                data.userFavos[pre_like].favo = req.body.favo;
            } else {
                data.userFavos.push(req.body);
            }
            data.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.get('/get-user-id/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ lineID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] <get-comment-id> DATA NOT FOUND!");
        }
        else {
            res.json(data);
        }
    })
});

router.get('/get-comment-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            const empty_comment = new Comment({
                commentLikes: {
                    num_likes: 0,
                    num_dislikes: 0
                }
            });
            res.json(empty_comment);
        }
        else {
            res.json(data);
        }
    })
});

router.get('/get-offer-id/:id', (req, res) => {
    const offerID = req.params.id;
    Offer.findOne({ offerID: offerID }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] <get-offer-id> DATA NOT FOUND!");
        }
        else {
            res.json(data);
        }
    })
});

router.get('/delete-offer-id/:id', (req, res) => {
    const offerID = req.params.id;
    Offer.deleteOne({ offerID: offerID }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    })
});

module.exports = router;