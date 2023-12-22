'use client'

import LeafletMap from "./LeafletMap";
import { useState, useEffect } from "react";


export default function MapSection ({dataSites}) {

    console.log("dataSites")
    console.log(dataSites)

    const [siteList, setSiteList] = useState(dataSites)

    // useEffect(()=>{
    //     fetch("http://172.19.128.128:1337/api/sites")
    //         .then( res => res.json())
    //         .then( data => setSiteList(data.data))

    // },[])

    const dataFiltered = siteList.filter(item => item.attributes.department.includes("JUNIN"))
    //const dataFiltered = siteList.filter(item => item.id < 300000)

    return(
        <>
            {
                siteList
                ?
                    <LeafletMap dataToShow={dataFiltered} /> 
                :
                    <div>
                        Loading...
                    </div>

            }
        </>
    )
}