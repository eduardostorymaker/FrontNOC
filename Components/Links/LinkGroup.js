'use client'

import LinkItem from "./LinkItem"


const filterListByName = (name, list) => {
    const dataFiltered = list.data.filter(item=>item.attributes.group.data.attributes.name === name)
    return dataFiltered || []
}

export default function LinkGroup ({ groupName, dataLinks }) {

    const dataFiltered = filterListByName(groupName,dataLinks)

    return(
        <div className="h-full">
            <div className="flex flex-col shadow-lg shadow-md shadow-red-500/50 border-2 rounded-xl py-4">
                <div className="flex w-full font-bold justify-center text-red-600 py-3 ">
                    <h3>
                        {groupName}
                    </h3>
                </div>
                <div>
                    {
                        dataFiltered.map(item => 
                            <LinkItem url={item.attributes.url} name={item.attributes.name} description={item.attributes.description} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}