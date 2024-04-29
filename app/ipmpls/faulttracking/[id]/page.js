import FaultTrackingItemTemplate from "../../../../Components/Ipmpls/FaultTracking/dinamic/FaultTrackingItemTemplate"


export default async function FaultTrackingDinamic ({ params }) {

    return(
        <div className="h-full w-full">
            <FaultTrackingItemTemplate id={params.id} />
        </div>
    )
}