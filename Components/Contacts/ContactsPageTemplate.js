'use client'

import { useState } from "react";

import ContactCard from "../../Components/Contacts/ContactCard";
import FilterContacts from "./FilterContacts";
import { Cottage } from "@mui/icons-material";

const extractGroups = (datalist) => {
    
    const groups = datalist.map(item => {return(
        {
            id: item.attributes.workteam.data.id,
            name: item.attributes.workteam.data.attributes.name,
            description: item.attributes.workteam.data.attributes.description,
            priority: item.attributes.workteam.data.attributes.priority
        }
    )})

    const uniqueValues = groups.reduce((a,v)=> {
        if (!a.map(item=>item.id).includes(v.id)) {
            a.push(v)
        }
        return a
    }, [])

    const orderedByPriority = uniqueValues.sort((a,b)=> a.priority>b.priority?-1:a.priority<b.priority?1:0)

    return orderedByPriority
}

export default function ContactsPageTemplate ({ datalist }) {

    const [contactList,setContactList] = useState(datalist.data)  
    const groups = extractGroups(contactList)
    
    const searchWord = (e) => {
        const filtered = datalist.data.filter(item => item.attributes.value.toLowerCase().includes(e.target.value.toLowerCase())||item.attributes.workteam.data.attributes.name.toLowerCase().includes(e.target.value.toLowerCase()) ||item.attributes.workteam.data.attributes.description.toLowerCase().includes(e.target.value.toLowerCase()))
        setContactList(filtered)
    }


    return(
        <div className="w-full">
            <div className="bg-red-500">
                <FilterContacts searchWord={searchWord} />
            </div>
            <div className="grid grid-cols-4 grid-flow-row p-4 gap-4">
                {
                    groups?.map( item => 
                        <ContactCard key={item.id} name={item.name} description={item.description} list={contactList} />
                    )
                }
            </div>
            
        </div>
    )
}