'use client'

import LinkItem from "./LinkItem"


const filterListByName = (name, list) => {
    const dataFiltered = list.data.filter(item=>item.attributes.group.data.attributes.name === name)
    return dataFiltered || []
}

export default function LinkGroup ({ groupName, dataLinks }) {

    const dataFiltered = filterListByName(groupName,dataLinks)

    return(
        <div className="border-solid border-2 flex-auto">
            <div className="font-bold">
                {groupName}
            </div>
            <div>
                {
                    dataFiltered.map(item => 
                        <LinkItem url={item.attributes.url} name={item.attributes.name} description={item.attributes.description} />
                    )
                }
            </div>
        </div>
    )
}