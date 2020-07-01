import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import ContentMarkdown from '../../components/ContentMarkdown';

import "./InfoCard.css"
import ReactLoading from 'react-loading';
import UserComment from '../../components/UserComment';
import UserLeaveComment from '../../components/UserLeaveComment';
import UserAction from '../../components/UserAction';

// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    editorContainer: {

    },
    root: {
        width: "100vw",
        minHeight: "100vh",
        fontFamily: "cwTeXYen",
    },
    contentHolder: {
        margin: "5vw",
    },
    actionHolder: {
        padding: "5vw",
    },
    commentHolder: {
        padding: "5vw",
    }
});

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            OS: undefined,
            loading_offer: true,
            loading_user: true,
            loading_comment: true,

            OfferData: true,
            userData: {

            },
            infoData: {
                offerID: undefined,
                offerName: undefined,
                cardInfo: undefined,
                tags: undefined,
                provider: undefined,
                beginDate: undefined,
                endDate: undefined,
                contents: undefined,
                offerAbstract: undefined,
            },
            comments: undefined,
            commentLikes: undefined,
            userData: undefined,
            userComment: undefined
        }
    }

    componentWillMount = () => {
        // const id = this.props.match.params.id;

        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id');
        console.log(id)

        this.setState({
            id: id
        })
        // var infoData = {
        //     offerName: "優惠1",
        //     offerID: "123456",
        //     cardInfo:
        //         [
        //             {
        //                 cardID: "555",
        //                 cardName: "卡片"
        //             }
        //         ],
        //     provider: "卡伯",
        //     offerAbstract: "優惠1offerAbstract",
        //     category: "國內一般消費",
        //     tags: ["測試", "測試2"],
        //     beginDate: "2020-01-06",
        //     endDate: "2020-01-06",
        //     contents: "- 優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1優惠1",
        // }

        // var d = new Date();
        // var commentData = {
        //     comments: [
        //         {
        //             userName: "Toby",
        //             userID: "5577",
        //             userImage: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
        //             content: "我覺得很棒66666666666666666666666666666666666666\n\n😊",
        //             showStatus: true,
        //             time: d
        //         },
        //         {
        //             userName: "Toby2",
        //             userID: "5578",
        //             userImage: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        //             content: "我也覺得很棒",
        //             showStatus: true,
        //             time: d
        //         },
        //     ],
        //     commentLikes: {
        //         num_likes: 3,
        //         num_dislikes: 4,
        //         users: [
        //             { userID: "5579", like: true },
        //             { userID: "0002", like: true },
        //             { userID: "0003", like: false },
        //             { userID: "0004", like: false },
        //             { userID: "0005", like: false },
        //             { userID: "5578", like: false },
        //             { userID: "5577", like: true }
        //         ],
        //     }
        // }

        // var userData = {
        //     userName: "Toby3",
        //     userID: "5579",
        //     userImage: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        // }

        // this.setState({
        //     userData: userData,
        //     loading_user: false
        // })

        // const userLikeComment = commentData.commentLikes.users.find(el => el.userID === userData.userID).like;

        // const userComment = {
        //     like: userLikeComment,
        //     favo: true
        // }

        // this.setState({
        //     infoData: infoData,
        //     comments: commentData.comments,
        //     commentLikes: commentData.commentLikes,
        //     userData: userData,
        //     userComment: userComment
        // });
        var userData = null;

        liff.init({ liffId: '1654394004-OGgr6yb8' }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: ("https://share.cardbo.info/?id=" + id) });
            }
        }).then(
            () => liff.getOS()
        ).then(
            (OS) => { this.setState({ OS: OS }) }
        ).then(
            () => liff.getProfile()
        ).then((profile) => {
            if (!profile.userId) {
                console.log("USER ID ERROR!");
            } else {
                userData = {
                    userName: profile.displayName,
                    userID: profile.userId,
                    userImage: profile.pictureUrl,
                }
                this.setState({
                    userData: {
                        userName: profile.displayName,
                        userID: profile.userId,
                        userImage: profile.pictureUrl,
                    }
                });
            }
        }).then(() => {
            this.setState({
                loading_user: false
            })
        }).then(() => {

            fetch('/api/get-offer-id/' + id).catch(function (error) {
                console.log("[Error] " + error);
            }).then(
                res => res.json()
            ).then((data) => {
                if (data) {
                    this.setState({
                        infoData: {
                            offerName: data.offerName,
                            offerID: data.offerID,
                            cardInfo: data.cardInfo,
                            provider: data.provider,
                            offerAbstract: data.offerAbstract,
                            category: data.category,
                            tags: data.tags,
                            beginDate: data.expiration.beginDate,
                            endDate: data.expiration.endDate,
                            contents: data.reward.contents,
                        },
                    });
                } else {
                    console.log("offer data not found!");
                }
            }).then(() => {
                this.setState({ loading_offer: false });
            });

            fetch('/api/get-comment-id/' + id).catch(function (error) {
                console.log("[Error] " + error);
            }).then(
                res => res.json()
            ).then((data) => {
                if (data) {
                    var num_likes_count = 0;
                    var num_dislikes_count = 0;

                    for (var i = 0; i < data.userLikes.length; ++i) {
                        if (data.userLikes[i].like === true)
                            num_likes_count++;
                        else if (data.userLikes[i].like === false)
                            num_dislikes_count++;
                    }

                    const userLikeComment = data.userLikes.find(el => el.userID === userData.userID);
                    var userLikeCommentResult = null;
                    if (userLikeComment) {
                        userLikeCommentResult = userLikeComment.like;
                    }

                    const userFavoComment = data.userFavos.find(el => el.userID === userData.userID);
                    var userFavoCommentResult = false;
                    if (userFavoComment) {
                        userFavoCommentResult = userFavoComment.favo;
                    }

                    data.comments = data.comments.filter(function (el) { return el != null; });

                    for (var i = 0; i < data.comments.length; ++i) {
                        data.comments[i].time = new Date(data.comments[i].time);
                    }

                    const compare = (a, b) => {
                        if (a.time > b.time) {
                            return -1;
                        } else if (a.time < b.time) {
                            return 1;
                        }
                        return 0;
                    }

                    this.setState({
                        comments: data.comments.sort(compare),
                        commentLikes: {
                            num_likes: num_likes_count,
                            num_dislikes: num_dislikes_count,
                            users: data.users
                        },
                        userComment: {
                            like: userLikeCommentResult,
                            favo: userFavoCommentResult
                        },
                    });

                } else {
                    console.log("comment data not found!");
                }
            }).then(() => {
                this.setState({ loading_comment: false });
            });
        });
    }

    userAddToFavo = () => {
        var new_userComment = this.state.userComment;
        new_userComment.favo = !new_userComment.favo;
        this.setState({
            userComment: new_userComment
        })

        //fetch
        fetch('/api/save-favo-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                userID: this.state.userData.userID,
                favo: new_userComment.favo
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )
    }

    userAddToLike = () => {
        var new_userComment = this.state.userComment;
        var new_commentLikes = this.state.commentLikes;
        var new_like = null;

        if (new_userComment.like === true) {
            new_userComment.like = null;
            new_commentLikes.num_likes--;

            this.setState({
                userComment: new_userComment,
                commentLikes: new_commentLikes
            });
        } else {
            new_like = true;
            if (new_userComment.like === false) {
                new_userComment.like = true;

                new_commentLikes.num_likes++;
                new_commentLikes.num_dislikes--;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })
            } else {
                new_userComment.like = true;

                new_commentLikes.num_likes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })
            }
        }

        //fetch
        fetch('/api/save-like-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                userID: this.state.userData.userID,
                like: new_like
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )
    }

    userAddToDislike = () => {
        var new_userComment = this.state.userComment;
        var new_commentLikes = this.state.commentLikes;
        var new_like = null;

        if (new_userComment.like === false) {
            new_userComment.like = null;
            new_commentLikes.num_dislikes--;

            this.setState({
                userComment: new_userComment,
                commentLikes: new_commentLikes
            });

        } else {
            new_like = false;
            if (new_userComment.like === true) {
                new_userComment.like = false;

                new_commentLikes.num_likes--;
                new_commentLikes.num_dislikes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })

            } else {
                new_userComment.like = false;
                new_commentLikes.num_dislikes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })

            }
        }

        //fetch
        fetch('/api/save-like-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                userID: this.state.userData.userID,
                like: new_like
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )

    }

    handleSendCommend = (text) => {
        const d = new Date();
        const s = d.toISOString();

        this.setState(prevState => ({
            comments: [{
                userName: prevState.userData.userName,
                userID: prevState.userData.userID,
                userImage: prevState.userData.userImage,
                content: text,
                showStatus: true,
                time: d
            },
            ...prevState.comments]
        }))

        fetch('/api/append-comment-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                new_comments: {
                    userName: this.state.userData.userName,
                    userID: this.state.userData.userID,
                    userImage: this.state.userData.userImage,
                    content: text,
                    showStatus: true,
                    time: s
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )
    }

    render() {
        const { classes } = this.props;
        if (this.state.loading_user || this.state.loading_offer || this.state.loading_comment) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'spinningBubbles'} color={'#0058a3'} height={'5rem'} width={'5rem'} />
                </div>
            );
        }
        else if (!this.state.OfferData) {
            return (
                <div className={classes.root}>Data Not Found!</div>
            );
        }
        else {
            return (
                <div className={classes.root}>
                    <Card className={classes.contentHolder}>
                        <ContentMarkdown
                            title={this.state.infoData.offerName}
                            subtitle={`優惠期間: ${this.state.infoData.beginDate} - ${this.state.infoData.endDate}`}
                            source={this.state.infoData.contents}
                            provider={this.state.infoData.provider}
                            skipHtml='skip'
                            escapeHtml='escape'
                        />
                        <UserAction
                            id={this.state.id}
                            num_likes={this.state.commentLikes.num_likes}
                            num_dislikes={this.state.commentLikes.num_dislikes}
                            like_checked={this.state.userComment.like !== null ? this.state.userComment.like : false}
                            dislike_checked={this.state.userComment.like !== null ? !this.state.userComment.like : false}
                            favo_checked={this.state.userComment.favo}
                            userAddToFavo={this.userAddToFavo}
                            userAddToLike={this.userAddToLike}
                            userAddToDislike={this.userAddToDislike}
                        />
                    </Card>

                    <div className={classes.commentHolder}>
                        <UserLeaveComment
                            userName={this.state.userData.userName}
                            userImage={this.state.userData.userImage}
                            handleSendCommend={this.handleSendCommend}
                        />
                    </div>

                    <div className={classes.commentHolder}>
                        {this.state.comments.map((i, index) => (
                            <UserComment
                                key={`comment-${index}`}
                                userName={i.userName}
                                userImage={i.userImage}
                                content={i.content}
                                time={i.time}
                            />
                        ))}
                    </div>

                </div>
            )
        }
    }
}
export default withStyles(useStyles)(ViewPage)