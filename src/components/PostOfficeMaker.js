import L from 'leaflet';
import './marker.css';
import iconImage from '../assets/marker.svg'
import DivIcon from 'react-leaflet-div-icon';

const PostOfficeMaker = new L.DivIcon({
    html: `
    <div>
        <span class="my-div-span">RAF Banff Airfield</span>
    </div>
    `,
    // iconUrl: require('../assets/marker.svg'),
    // iconRetinaUrl: require('../assets/marker.svg'),
    iconAnchor: new L.point(30, 75),
    popupAnchor: new L.point(0, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    // className: 'leaflet-div-icon'
});

export default  PostOfficeMaker;