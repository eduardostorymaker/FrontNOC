'use client'

import "leaflet/dist/leaflet.css";
import markerIconPng from "../../public/icons/marker-icon.png"
//import markerIconPng from " ../../node_modules/leaflet/dist/images/marker-icon.png"

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker  } from "react-leaflet"

import pinIcon from "../assets/icons/marker-icon.png"
import shadowPinIcon from "../assets/icons/marker-shadow.png"


const myIcon = L.icon({
    iconUrl: pinIcon.src,
    iconSize: [24, 32],
    iconAnchor: null,
    popupAnchor: [-3, -76],
    shadowUrl: shadowPinIcon.src,
    shadowSize: [24, 32],
    shadowAnchor: null,
    className: "leaflet-venue-icon"
})


const redOptions = { color: 'red' }

export default function Map() {
    

    const position1 =  [-12.086623479843762,-77.00395738936616]
    const position2 =  [-12.1436,-77.0009]
    return(
        <div className="h-full w-full">
       
            <MapContainer className="h-full w-full" center={position1} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker  position={position1} icon={myIcon} >
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker >
            </MapContainer>
        
        </div>
    )
}
            // <CircleMarker  center={position2} pathOptions={redOptions} radius={20} className="Hola" >
            //     <Popup>
            //     A pretty CSS3 popup. <br /> Easily customizable.
            //     </Popup>
            // </CircleMarker >