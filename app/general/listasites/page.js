import ListaSitesTemplate from "../../../Components/General/ListaSites/ListaSitesTemplate"

const getSitesList = async () => {
    const response = await fetch("http://172.19.128.128:1337/api/sites", {cache: 'no-store'})
    const data = await response.json()
    return data.data
}

export default async function listasites() {

    const dataSitesList = await getSitesList()
    console.log("Lista de sites")
    console.log(dataSitesList)

    return(
        <div>
            <ListaSitesTemplate dataSitesList={dataSitesList} />
        </div>
    )
}