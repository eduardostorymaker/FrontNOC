import dynamic from 'next/dynamic'

const MapSection = dynamic(() => import("../../Components/Map/MapSection"), {
    ssr:false
})

//import MapSection from "../../Components/Map/MapSection";

const getDataSites = async () => {
    const response = await fetch("http://172.19.128.128:3000/api/sites", { cache:"no-cache"})
    const data = await response.json()
    return data.data
}



export default async function mymap () {

    const dataSites = await getDataSites()

    return(
        <MapSection dataSites={dataSites} /> 
    )
}