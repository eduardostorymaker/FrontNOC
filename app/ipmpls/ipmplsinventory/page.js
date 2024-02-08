import IpmplsInventoryTemplate from "../../../Components/Ipmpls/IpmplsInventory/IpmplsInventoryTemplate";

const getDataIpmplsDevice = async () => {

    const response = await fetch("http://172.19.128.128:1337/api/ipmplsdevices?populate=*",{cache: 'no-cache'})
    const data = await response.json()
    return data.data
}


export default async function ipmplsinventory() {

    const ipmplsDeviceData = await getDataIpmplsDevice()

    return(
        <IpmplsInventoryTemplate ipmplsDeviceData={ipmplsDeviceData}  />
    )   
}