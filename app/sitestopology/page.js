import dynamic from 'next/dynamic'

const SitesTopologyTemplate = dynamic(() => import("../../Components/Map/SitesTopologyTemplate"), {
    ssr:false
})

//import MapSection from "../../Components/Map/MapSection";

const getDataSites = async () => {
    const response = await fetch("http://172.19.128.128:3060/api/sites", { cache:"no-cache"})
    const data = await response.json()
    return data.data
}



export default async function mymap () {

    const dataSites = await getDataSites()

    return(
        <SitesTopologyTemplate dataSites={dataSites} />
    )
}