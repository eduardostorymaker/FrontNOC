'use client'

import { useState } from "react";
import "leaflet/dist/leaflet.css";

//import markerIconPng from " ../../node_modules/leaflet/dist/images/marker-icon.png"

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from "react-leaflet"

import ChangeView from "./ChangeView";

import pinIcon from "../../assets/icons/technology.png"
import shadowPinIcon from "../../assets/icons/marker-shadow.png"
import centerIcon from "../../assets/icons/placeholder.png"

const myIcon = L.icon({
    iconUrl: pinIcon.src,
    iconSize: [35, 30],
    iconAnchor: null,
    popupAnchor: [-3, -10],
    shadowUrl: shadowPinIcon.src,
    shadowSize: [0, 0],
    shadowAnchor: null,
    className: "leaflet-venue-icon"
})

const myCenterIcon = L.icon({
    iconUrl: centerIcon.src,
    iconSize: [40, 35],
    iconAnchor: null,
    popupAnchor: [-3, -10],
    shadowUrl: pinIcon.src,
    shadowSize: [35, 30],
    shadowAnchor: [5, 4],
    className: "leaflet-venue-icon"
})


const redOptions = { color: 'red' }

export default function LeafletMap({ dataToShow,siteSelected,showToolTip }) {

    
    const itemsToPrint = dataToShow.map( item => {
        return({
            code: item.attributes.papcode,
            name: item.attributes.papname,
            position: 
            [
                item.attributes.latitude,
                item.attributes.longitude
            ]
        })
    })


    const positionSelected = [siteSelected.attributes.latitude, siteSelected.attributes.longitude]
   
    return(
        <div className="h-full w-full">

       
            <MapContainer className="h-full w-full" center={positionSelected} zoom={20} scrollWheelZoom={true}>
                <ChangeView center={positionSelected} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    itemsToPrint.map(item => {
                        let iconToShow = myIcon
                        if (item.position[0] === positionSelected[0] && item.position[1] === positionSelected[1]) {
                            iconToShow = myCenterIcon
                        } 
                        return(
                            <Marker  position={item.position} icon={iconToShow} title={`${item.code} ${item.name}`} >
                                <Popup>
                                {item.code} {item.name}
                                </Popup>
                                {
                                    showToolTip
                                    ?
                                    <Tooltip direction="right" offset={[10, 0]} opacity={1} permanent>{`${item.code} ${item.name}`}</Tooltip>
                                    :
                                    <></>
                                }
                                
                            </Marker >
                        )
                      
                    }

                    )
                }
            </MapContainer>
        
        </div>
    )
}
 