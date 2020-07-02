import React, { Component } from 'react'
import { renderToString } from 'react-dom/server';
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

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import iconImage from '../assets/marker.svg'


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import postOffcieImage from "../assets/post-office-icon.png"
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
    },
    carouselHolder: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "12rem",
        zIndex: "500",
    },
    carouselCard: {
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        height: "100%",
    }
});

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        // slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        // slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        // slidesToSlide: 1 // optional, default to 1.
    }
};



const responsive2 = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
    }
}

class PostMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            allMarkers: [],
            userLocation: [0, 0],
            centerLocation: [0, 0],
            loading: true,
        }
        this.mapRef = React.createRef();
        this.autopan = true;
    }

    componentWillMount = () => {
        // const id = this.props.match.params.id;
        // const params = new URLSearchParams(this.props.location.search);
        // const id = params.get('id');
        // console.log(id)

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

        const postData = require('./PostData.json')

        this.setState({
            postData: postData
        })


        window.navigator.geolocation.getCurrentPosition(
            success => {
                this.setState({
                    userLocation: new LatLng(success.coords.latitude, success.coords.longitude),
                    centerLocation: new LatLng(success.coords.latitude, success.coords.longitude),
                });



                var allMarkers = postData.map((v, id) => ({ position: new LatLng(v.latitude, v.longitude), id: id })).sort(
                    function compareDistnace(a, b) {
                        return (Math.pow(success.coords.latitude - a.position.lat, 2) + Math.pow(success.coords.longitude - a.position.lng, 2))
                            - (Math.pow(success.coords.latitude - b.position.lat, 2) + Math.pow(success.coords.longitude - b.position.lng, 2));
                    }
                );
                this.setState(
                    { allMarkers: allMarkers, loading: false },
                    this.displayMarkers
                );

                console.log([success.coords.latitude, success.coords.longitude])
            },
            error => {
                alert(`無法取得使用者位置: ${error.code} : ${error.message}`);
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );

        this.setState({
            postData: postData
        })
    }


    displayMarkers = () => {
        if (this.state.loading) return;
        if (this.autopan) {
            this.autopan = false;
            setTimeout(() => {
                const map = this.mapRef.current.leafletElement;
                const markers = this.state.allMarkers.map(
                    (m, i) => map.getBounds().contains(m.position) ? { index: m.id, position: m.position } : undefined).filter(x => x)
                this.setState({
                    markers: markers
                });
                this.autopan = true;
            }, 200)
        }
    }

    onCarouselChange = (currentSlide) => {

    }

    handleMarkerClick = (e) => {
        // this.setState({ centerLocation: e.latlng })
    }

    // onautopanstart = () => {
    //     console.log("autopan")
    //     this.autopan = true
    // }

    render() {

        const { classes } = this.props;
        const coordinates = this.state.position;

        const markers = this.state.markers.map((i, id) => (
            <Marker position={i.position} onClick={this.handleMarkerClick}>
                <Popup>
                    <span>
                        {this.state.postData[i.index].storeNm}<br />{`三倍券存量: ${this.state.postData[i.index].total}`}
                    </span>
                </Popup>
            </Marker>
        ));

        const carouselCards = this.state.markers.map((i, id) => (
            <Card className={classes.carouselCard}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="中華郵政" className={classes.avatar} src={postOffcieImage}>
                            郵
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.postData[i.index].storeNm}
                    subheader={this.state.postData[i.index].addr}
                />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        hi<br />
                        hi<br />

                    </Typography>
                </CardContent>

            </Card>
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
                <>
                    <Map
                        autopanstart={this.onautopanstart}
                        onMoveEnd={this.displayMarkers}
                        ref={this.mapRef}
                        center={this.state.centerLocation}
                        zoom={15}
                        style={{ height: '100vh' }}
                        preferCanvas={true}
                    // markerZoomAnimation={false}
                    >

                        <TileLayer
                            attribution="&amp;copy <a href=&quot;https:www.cardbo.info&quot;>卡伯 </a> 提供"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={this.state.userLocation} >
                            <Popup>
                                <span>
                                    {`您現在的位置`}
                                </span>
                            </Popup>
                            {/* <Tooltip permanent={true} direction="top " offset={new L.Point(0, 30)}>您現在的位置</Tooltip> */}
                        </Marker>
                        {markers}
                    </Map>
                    <div className={classes.carouselHolder}>
                        <Carousel
                            style={{ height: "100%" }}
                            swipeable={true}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            // autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}

                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"

                            afterChange={(previousSlide, { currentSlide, onMove }) => this.onCarouselChange(currentSlide)}
                        >
                            {carouselCards}
                        </Carousel>;
                    </div>
                </>
            )
        }
    }
}

export default withStyles(useStyles)(PostMap)