import RoamingContactTemplate from "../../../Components/Csps/RoamingContacts/RoamingContactTemplate";

const getdataRoamingContact = async () => {
    const response = await fetch("http://172.19.128.128:1337/api/roamingoperators?populate=*&sort[0]=country.name",{cache:"no-store"})
    const data = await response.json()
    // console.log("roaming")
    // console.log(data.data)
    return data.data
}

export default async function roamingcontact () {

    const dataRoaming = await getdataRoamingContact()

    return(
        <>
            <RoamingContactTemplate dataRoaming={dataRoaming} />
        </>
    )
}