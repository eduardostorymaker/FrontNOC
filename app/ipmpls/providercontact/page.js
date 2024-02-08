import ProviderContactTemplate from "../../../Components/Ipmpls/ProviderContacts/ProviderContactTemplate";

const getProviderData = async () => {
    const response = await fetch("http://172.19.128.128:1337/api/providercontacts?populate=*&sort[0]=providertype.name",{cache: "no-cache"})
    const data = await response.json()
    //console.log("proveedores")
    //console.log(data.data)
    return data.data
}

export default async function providercontact() {

    const providerData = await getProviderData()

    return (
        <div>
            <ProviderContactTemplate providerData={providerData} />
        </div>
    )
}