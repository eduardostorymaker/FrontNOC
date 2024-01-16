import IntxInventoryTemplate from "../../../Components/Ipmpls/IntxInventory/IntxInventoryTemplate"

const getDataIntx = async () => {

    const response = await fetch("http://172.19.128.128:1337/api/ipmplsintxs?populate=*", { cache: 'no-store' })
    const data = await response.json()

    return data.data
}

export default async function intxinventory() {

    const dataIntx = await getDataIntx()

    console.log(dataIntx)
    return(
        <div className="h-full h-full">
            <IntxInventoryTemplate dataIntx={dataIntx} />
        </div>
    )
}