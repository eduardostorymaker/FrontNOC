import FaultTrackingTemplate from "../../../Components/Ipmpls/FaultTracking/FaultTrackingTemplate";

// const getDataTracking = async () => {

//     const res = await fetch("http://172.19.128.128:3060/api/faulttracking", {cache: "no-cache"})
//     const data = await res.json()
//     return data.data
// }

export default async function faulttracking () {

    // const dataTracking = await getDataTracking()
    // console.log(dataTracking)

    return (
        <div className="w-full h-full">
            <FaultTrackingTemplate />
        </div>
    )
}