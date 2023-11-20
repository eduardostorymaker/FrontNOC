import ContactCard from "../../Components/Contacts/ContactCard";

const getDataTeams = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/workteams?populate=*&sort[0]=priority:desc", {cache: 'no-store'})
    const data = await res.json()
    return data
}

const getDataList = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/datacontacts?populate=*", {cache: 'no-store'})
    const data = await res.json()
    return data
}


export default async function Contacts() {
   
    const dataTeams = await getDataTeams()
    const datalist = await getDataList()
    console.log('dataTeams')
    console.log(dataTeams)
 
    return(

        <div className="grid grid-cols-4 grid-flow-row p-4 gap-4">
            
            {
                dataTeams?.data.map( item => 
                    <ContactCard key={item.id} name={item.attributes.name} description={item.attributes.description} list={datalist} />
                )
            }
        </div>
  
    )
}

