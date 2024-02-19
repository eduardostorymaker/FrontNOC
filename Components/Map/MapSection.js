'use client'

import LeafletMap from "./LeafletMap";
import { useState, useEffect } from "react";

import MapSectionFilter from "./MapSectionFilter";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from "@mui/icons-material";


export default function MapSection ({dataSites}) {

    const [showMenu, setShowMenu] = useState(true)
    const [radioValue, setRadioValue] = useState(1)
    const [showToolTip, setShowToolTip] = useState(false)
    const [textFilter, setTextFilter] = useState("")
    const [siteSelected, setSiteSelected] = useState(dataSites.find(item => item.attributes.papcode=== "LI1809"))

    console.log(textFilter)

    const onUpdate = (valueEntry) => {
        setRadioValue(valueEntry)
    }

    const gradeToKm = 111.32
    const firstDistanceToShow = 1

    const showedMenuStyles = `flex h-[300px] w-full bg-white bg-opacity-80 absolute top-0  z-[20000]`
    const hiddenMenuStyles = `hidden`

    const showedMapStyles = `h-full w-full`
    const hiddenMapStyles = "h-full w-full"

    const buttonShareStyles = "absolute right-0 top-[4px] bg-opacity-70 text-white h-[60px] w-[60px] z-[20001] rounded-full transition ease-in-out duration-5000 flex justify-center items-center"
    const buttonShowStyles = `${buttonShareStyles} bg-red-500 `
    const buttonHiddenStyles = `${buttonShareStyles} bg-yellow-500  rotate-[135deg]`


    const getDistance = (latitude,longitude) => {
        return Math.pow(Math.pow(latitude - siteSelected.attributes.latitude,2) + Math.pow(longitude-siteSelected.attributes.longitude,2),0.5)*gradeToKm
    }

    const dataFiltered = dataSites.filter(item => getDistance(item.attributes.latitude, item.attributes.longitude) < radioValue)



    return(
        <div className="w-full h-full relative">
            {/* Inicio boton */}
            <div 
                className={showMenu?buttonHiddenStyles:buttonShowStyles}
                onClick={()=>setShowMenu(!showMenu)}
            >
                <AddIcon />

            </div>
            {/* Fin boton */}
            
            <div className={showMenu?showedMenuStyles:hiddenMenuStyles}>
                <MapSectionFilter 
                    radioValue={radioValue} 
                    setRadioValue={setRadioValue}
                    dataSites={dataSites} 
                    setSiteSelected={setSiteSelected} 
                    showToolTip={showToolTip} 
                    setShowToolTip={setShowToolTip} 
                    textFilter={textFilter}
                    setTextFilter={setTextFilter} 
                />
            </div>
            <div className={showMenu?showedMapStyles:hiddenMapStyles}>
                <LeafletMap dataToShow={dataFiltered} siteSelected={siteSelected} showToolTip={showToolTip} /> 
            </div>
        </div>
    )
}