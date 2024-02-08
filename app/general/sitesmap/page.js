import dynamic from 'next/dynamic'

const SitesMapTemplate = dynamic(() => import("../../../Components/General/SitesMap/SitesMapTemplate"), {
    ssr:false
})

export default function sitesmap () {

    return(
        <div className="h-full w-full">
            <SitesMapTemplate />
        </div>
    )
}