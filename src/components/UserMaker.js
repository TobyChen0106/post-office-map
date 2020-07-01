import L from 'leaflet';

const UserMaker = new L.Icon({
    iconUrl: require('../assets/marker(1).svg'),
    iconRetinaUrl: require('../assets/logo_svg.svg'),
    iconAnchor: new L.point(30,30),
    popupAnchor: new L.point(0,0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon'
});

export { UserMaker };