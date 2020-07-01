import React, { Component } from 'react'
import { renderToString } from 'react-dom/server';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';
import { LatLng } from 'leaflet';
import L from 'leaflet';
import {
    Circle,
    CircleMarker,
    Map,
    Marker,
    Polygon,
    Popup,
    Rectangle,
    TileLayer,
    Tooltip,
} from 'react-leaflet'

import DivIcon from 'react-leaflet-div-icon';

import { PostOfficeMaker } from '../components/PostOfficeMaker';
import { UserMaker } from '../components/UserMaker';

import iconImage from '../assets/marker.svg'
// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    root: {

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

class PostMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [0, 0],
        }
    }

    componentWillMount = () => {
        // const id = this.props.match.params.id;
        // const params = new URLSearchParams(this.props.location.search);
        // const id = params.get('id');
        // console.log(id)

        const postData = require('./PostData.json')
        this.setState({ postData: postData })
        var userData = null;

        // liff.init({ liffId: '1654394004-OGgr6yb8' }).then(() => {
        //     if (!liff.isLoggedIn()) {
        //         liff.login({ redirectUri: ("https://share.cardbo.info/?id=" + id) });
        //     }
        // }).then(
        //     () => liff.getOS()
        // ).then(
        //     (OS) => { this.setState({ OS: OS }) }
        // ).then(
        //     () => liff.getProfile()
        // ).then((profile) => {
        //     if (!profile.userId) {
        //         console.log("USER ID ERROR!");
        //     } else {
        //         userData = {
        //             userName: profile.displayName,
        //             userID: profile.userId,
        //             userImage: profile.pictureUrl,
        //         }
        //         this.setState({
        //             userData: {
        //                 userName: profile.displayName,
        //                 userID: profile.userId,
        //                 userImage: profile.pictureUrl,
        //             }
        //         });
        //     }
        // }).then(() => {
        //     this.setState({
        //         loading_user: false
        //     })
        // }).then(() => {

        // fetch('/api/get-offer-id/' + id).catch(function (error) {
        //     console.log("[Error] " + error);
        // }).then(
        //     res => res.json()
        // ).then((data) => {
        //     if (data) {
        //         this.setState({
        //             infoData: {
        //                 offerName: data.offerName,
        //                 offerID: data.offerID,
        //                 cardInfo: data.cardInfo,
        //                 provider: data.provider,
        //                 offerAbstract: data.offerAbstract,
        //                 category: data.category,
        //                 tags: data.tags,
        //                 beginDate: data.expiration.beginDate,
        //                 endDate: data.expiration.endDate,
        //                 contents: data.reward.contents,
        //             },
        //         });
        //     } else {
        //         console.log("offer data not found!");
        //     }
        // }).then(() => {
        //     this.setState({ loading_offer: false });
        // });

        // fetch('/api/get-comment-id/' + id).catch(function (error) {
        //     console.log("[Error] " + error);
        // }).then(
        //     res => res.json()
        // ).then((data) => {
        //     if (data) {
        //         var num_likes_count = 0;
        //         var num_dislikes_count = 0;

        //         for (var i = 0; i < data.userLikes.length; ++i) {
        //             if (data.userLikes[i].like === true)
        //                 num_likes_count++;
        //             else if (data.userLikes[i].like === false)
        //                 num_dislikes_count++;
        //         }

        //         const userLikeComment = data.userLikes.find(el => el.userID === userData.userID);
        //         var userLikeCommentResult = null;
        //         if (userLikeComment) {
        //             userLikeCommentResult = userLikeComment.like;
        //         }

        //         const userFavoComment = data.userFavos.find(el => el.userID === userData.userID);
        //         var userFavoCommentResult = false;
        //         if (userFavoComment) {
        //             userFavoCommentResult = userFavoComment.favo;
        //         }

        //         data.comments = data.comments.filter(function (el) { return el != null; });

        //         for (var i = 0; i < data.comments.length; ++i) {
        //             data.comments[i].time = new Date(data.comments[i].time);
        //         }

        //         const compare = (a, b) => {
        //             if (a.time > b.time) {
        //                 return -1;
        //             } else if (a.time < b.time) {
        //                 return 1;
        //             }
        //             return 0;
        //         }

        //         this.setState({
        //             comments: data.comments.sort(compare),
        //             commentLikes: {
        //                 num_likes: num_likes_count,
        //                 num_dislikes: num_dislikes_count,
        //                 users: data.users
        //             },
        //             userComment: {
        //                 like: userLikeCommentResult,
        //                 favo: userFavoCommentResult
        //             },
        //         });

        //     } else {
        //         console.log("comment data not found!");
        //     }
        // }).then(() => {
        //     this.setState({ loading_comment: false });
        // });
        // });
    }

    componentDidMount = () => {
        window.navigator.geolocation.getCurrentPosition(
            success => {
                this.setState({ position: new LatLng(success.coords.latitude, success.coords.longitude) })
                console.log([success.coords.latitude, success.coords.longitude])
            },
            error => {
                alert(`無法取得使用者位置: ${error.code} : ${error.message}`);
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );
        this.setState({ hasLocation: true })
    }

    handleLocationFound(e) {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
        });
    }


    render() {

        const { classes } = this.props;
        const coordinates = this.state.position;
        console.log(coordinates)

        const markers = this.state.postData.map((i, id) => (
            <Marker position={new LatLng(i.latitude, i.longitude)} icon={UserMaker}>
                <Popup>
                    <span>
                        {i.storeNm}<br />{`三倍券存量: ${i.total}`}
                    </span>
                </Popup>
            </Marker>
        ));

        if (this.state.loading) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'spinningBubbles'} color={'#0058a3'} height={'5rem'} width={'5rem'} />
                </div>
            );
        }
        else {
            return (
                <Map center={coordinates} zoom={15} style={{ height: '100vh' }} preferCanvas={true} onLocationfound={this.handleLocationFound}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        // 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates} icon={UserMaker}>
                        <Popup>
                            <span>
                                {`您現在的位置`}
                            </span>
                        </Popup>
                        <Tooltip permanent={true} direction="top " offset={new L.Point(0,30)}>您現在的位置</Tooltip>
                    </Marker>
                    {markers}
                </Map>
            )
        }
    }
}

export default withStyles(useStyles)(PostMap)