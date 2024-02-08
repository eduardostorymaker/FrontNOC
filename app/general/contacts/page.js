import ContactsPageTemplate from "../../../Components/General/Contacts/ContactsPageTemplate";

const getDataList = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/datacontacts?populate=*&sort[0]=type.type:asc", {cache: 'no-cache'})
    const data = await res.json()
    return data
}


export default async function Contacts() {
    
    const datalist = await getDataList()

    return(

        <ContactsPageTemplate datalist={datalist} />
  
    )
}

