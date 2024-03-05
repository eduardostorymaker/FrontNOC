

//import { useState, useEffect } from 'react'
//import { useSearchParams } from 'next/navigation'

import FaultTrackingItemTemplate from "../../../../Components/Ipmpls/FaultTracking/dinamic/FaultTrackingItemTemplate"

const getDataTracking = async (url) => {
    const res = await fetch(url, {cache: "no-store"})
    const data = await res.json()

    return data.data
}

export default async function FaultTrackingDinamic ({ params }) {

    //const [dataItem, setDataItem] = useState(undefined)
  
    const urlToFetch = `http://172.19.128.128:3061/api/faulttracking/${params.id}`
    const dataItem = await getDataTracking(urlToFetch)
    
    // useEffect(()=>{
    //     fetch(urlToFetch)
    //         .then((res) => res.json())
    //         .then(data => setDataItem(data.data))
    // },[])


    return(
        <div className="h-full w-full">
            {
                dataItem
                ?                 
                <FaultTrackingItemTemplate dataItem={dataItem} />
                :
                <div>No se encontro elemento</div>

            }
        </div>
    )
}