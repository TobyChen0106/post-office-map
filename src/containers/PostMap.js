import React, { Component } from 'react'
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
import PostOfficeMaker from '../components/PostOfficeMaker';
import UserMaker from '../components/UserMaker';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Parser from 'html-react-parser';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

import postOffcieImage from "../assets/post-office-icon.png"
// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    root: {

    },
    loading: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0058a3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        height: "10.5rem",
        zIndex: "500",
    },
    carouselCard: {
        // margin: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        height: "10rem",
        overflow: "scroll",
    },
    gps: {
        borderRadius: "50%",
        // backgroundColor: "#ffffff",
        margin: "1rem",
        width: "4rem",
        height: "4rem",

        position: "fixed",
        bottom: "10rem",
        right: 0,
        zIndex: "600",
    },
    gpsIcon: {
        // backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        bottom: "11rem",
        right: 0,
        // zIndex: "601",
    },
    markers: {
        zIndex: "1000",
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
        items: 1,
        // slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        // slidesToSlide: 1 // optional, default to 1.
    }
};



class PostMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            allMarkers: [],
            userLocation: new LatLng(25.042229, 121.5651594),
            centerLocation: new LatLng(25.042229, 121.5651594),
            loading: true,
            focusedMark: undefined,
            fetchData: false,
            locationAvailable: false,
        }
        this.carouselRef = React.createRef();
        this.mapRef = React.createRef();
        this.autopan = true;
    }

    componentWillMount = () => {
        fetch('/api/getData').catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            res => {
                if (res.ok) {
                    return res.json()
                    this.setState({ fetchData: true });
                }
                else {
                    return null
                }
            }
        ).then((data) => {
            const postData = data ? data : require('./PostData.json');

            this.setState({
                postData: postData
            })

            // if ("geolocation" in window.navigator) {
            //     window.alert("Available");
            // } else {
            //     window.alert("請開啟定位功能");
            // }

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
                        { allMarkers: allMarkers },
                        () => {
                            this.displayMarkers();
                            this.setState({ loading: false });
                        }
                    );
                },
                error => {
                    var allMarkers = postData.map((v, id) => ({ position: new LatLng(v.latitude, v.longitude), id: id })).sort(
                        function compareDistnace(a, b) {
                            return (Math.pow(this.state.userLocation.lat - a.position.lat, 2) + Math.pow(this.state.userLocation.lng - a.position.lng, 2))
                                - (Math.pow(this.state.userLocation.lat - b.position.lat, 2) + Math.pow(this.state.userLocation.lng - b.position.lng, 2));
                        }
                    );

                    this.setState(
                        { allMarkers: allMarkers },
                        () => {
                            this.displayMarkers();
                            this.setState({ loading: false });
                        }
                    );
                    window.alert(`無法取得使用者位置，請確認已開啟定位功能\n ${error.code} : ${error.message}`);
                },
                { enableHighAccuracy: true, maximumAge: 10000 }
            );

            window.navigator.geolocation.watchPosition(
                success => {
                    this.setState({
                        userLocation: new LatLng(success.coords.latitude, success.coords.longitude),
                    });
                },
                error => { },
                { enableHighAccuracy: true, maximumAge: 10000 }
            );
        })
    }

    displayMarkers = () => {
        // if (this.state.loading) return;
        if (this.autopan) {
            this.autopan = false;
            setTimeout(() => {
                const map = this.mapRef.current.leafletElement;
                const markers = this.state.allMarkers.map(
                    (m, i) => map.getBounds().contains(m.position) ? { index: m.id, position: m.position } : undefined).filter(x => x);
                this.setState({
                    markers: markers,
                });
                if (!this.state.focusedMark || markers.findIndex(m => m.index === this.state.focusedMark) === -1) {
                    this.setState({
                        focusedMark: markers[0].index
                    });
                }
                this.autopan = true;
            }, 10)
        }
    }

    onCarouselChange = (currentSlide) => {
        var id = currentSlide - 2;
        if (id < 0) {
            id = this.state.markers.length + id
        }
        this.setState(pre => {
            return ({
                focusedMark: pre.markers[id].index
            })
        });
    }

    handleMarkerClick = (id) => {
        this.setState({ focusedMark: id });
        const focusedMarker = this.state.markers.find(m => m.index === id)
        if (focusedMarker) {
            const newCenter = focusedMarker.position;
            this.setState({
                markers: this.state.markers.sort(
                    function compareDistnace(a, b) {
                        return (Math.pow(newCenter.lat - a.position.lat, 2) + Math.pow(newCenter.lng - a.position.lng, 2))
                            - (Math.pow(newCenter.lat - b.position.lat, 2) + Math.pow(newCenter.lng - b.position.lng, 2));
                    }
                )
            })

        }
    }

    handleGps = () => {
        const map = this.mapRef.current.leafletElement;
        map.flyTo(this.state.userLocation, 15);
    }

    render() {
        const { classes } = this.props;

        const markers = this.state.markers.map((i, id) => {
            const makerIcon = PostOfficeMaker(this.state.postData[i.index].total, this.state.postData[i.index].people, i.index === this.state.focusedMark ? "#AA3939" : undefined);
            const popup = (i.index === this.state.focusedMark) ? (
                <Tooltip direction='top' offset={[0, -55]} opacity={1} permanent>
                    <span>{this.state.postData[i.index].storeNm}</span>
                </Tooltip>) : null;
            const zindex = (i.index === this.state.focusedMark) ? 1500 : 500;
            return (
                <Marker
                    zIndexOffset={zindex}
                    id={`m-${this.state.postData[i.index].storeCd}`}
                    position={i.position}
                    onClick={(e) => this.handleMarkerClick(i.index)}
                    icon={makerIcon}
                    key={`${id}`}>
                    {popup}
                </Marker>
            )
        });

        const carouselCards = this.state.markers.map((i, id) => {
            const memo = this.state.postData[i.index].busiMemo ? Parser("備註: " + this.state.postData[i.index].busiMemo) : undefined;
            return (
                <Card className={classes.carouselCard} key={`${id}`}>
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
                        subheader={Parser(this.state.postData[i.index].busiTime)}
                    />
                    <CardContent>

                        <Typography variant="body2" color="textSecondary" component="p">
                            {`三倍券存量: ${this.state.postData[i.index].total}  等待人數: ${10}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {memo}
                        </Typography>
                    </CardContent>

                </Card>
            )
        });

        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <ReactLoading type={'cubes'} color={'#ffffff'} height={'90vw'} width={'90vw'} />
                </div>
            );
        }
        else {
            return (
                <>
                    <Map
                        autopanstart={this.onautopanstart}
                        onMoveEnd={() => this.displayMarkers(false)}
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
                        <Marker position={this.state.userLocation} icon={UserMaker} zIndexOffset={600}>
                        </Marker>
                        {markers}
                    </Map>
                    <Button className={classes.gps} variant="contained" disableFocusRipple={true} onClick={this.handleGps}>
                        <GpsFixedIcon className={classes.gpsIcon} />
                    </Button >
                    <div className={classes.carouselHolder}>
                        <Carousel
                            ref={this.carouselRef}
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
                            // customTransition="all .5"
                            transitionDuration={800}
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
};


export default withStyles(useStyles)(PostMap)