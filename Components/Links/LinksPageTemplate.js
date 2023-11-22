'use client'

import FilterGroup from "../../Components/Links/FilterGroup"
import LinkGroup from "../../Components/Links/LinkGroup"
import { useState } from "react"

const filterGroupByWord = (Group, filter) => {
    console.log(Group)
    console.log("Group")
    const filteredGroup = Group.filter(item => item.attributes.name.includes(filter))
    return filteredGroup
}

const filterAll = [
    {
        id: "all",
        title: "TODO",
        word:"",
        selected: true
    },
    {
        id: "PACO",
        title: "PACO",
        word:"PACO",
        selected: false
    },
    {
        id: "NSS",
        title: "NSS",
        word:"NSS",
        selected: false
    }
]

const filterPACO = [
    {
        id: "all",
        title: "TODO",
        word:"",
        selected: false
    },
    {
        id: "PACO",
        title: "PACO",
        word:"PACO",
        selected: true
    },
    {
        id: "NSS",
        title: "NSS",
        word:"NSS",
        selected: false
    }
]

const filterNSS = [
    {
        id: "all",
        title: "TODO",
        word:"",
        selected: false
    },
    {
        id: "PACO",
        title: "PACO",
        word:"PACO",
        selected: false
    },
    {
        id: "NSS",
        title: "NSS",
        word:"NSS",
        selected: true
    }
]

const LinksPageTemplate = ({ getGroup, getLinks }) => {

    const [dataFilter,setDataFilter] = useState(filterAll)
    const [dataGroup, setDataGroup] = useState(getGroup.data)


    const changeSelection = (id) => {
        if (id === "NSS") {
            setDataFilter(filterNSS)
            setDataGroup(filterGroupByWord(getGroup.data,"NSS"))
        } else if (id === "PACO") {
            setDataFilter(filterPACO)
            setDataGroup(filterGroupByWord(getGroup.data,"PACO"))
        } else {
            setDataFilter(filterAll)
            setDataGroup(filterGroupByWord(getGroup.data,""))
        }

    }

    console.log("dataGroup")
    console.log(dataGroup)

    const selectFilter = () => {

        setDataGroup(filterGroupByWord(dataGroup,"PACO"))
    }
    
    return(
        <div className="w-full h-full">
            <div className="bg-red-500">
                <FilterGroup selectFilter={selectFilter} changeSelection={changeSelection} dataFilter={dataFilter} />
            </div>
            <div className="w-full p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  ">
                {
                    dataGroup.map(item =>
                        <LinkGroup key={item.id} groupName={item.attributes.name} dataLinks={getLinks} />
                    )
                }
            </div>
        </div>
    )
}

export default LinksPageTemplate