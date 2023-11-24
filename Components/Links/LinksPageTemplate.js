'use client'

import FilterGroup from "../../Components/Links/FilterGroup"
import LinkGroup from "../../Components/Links/LinkGroup"
import { useState } from "react"
import Submenu from "../Layout/Submenu"

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

const filterGroupByWord = (allData, filter) => {
    const filteredGroup = allData.filter(item => item.attributes.group.data.attributes.name.toLowerCase().includes(filter.toLowerCase()))
    return filteredGroup
}


const extractGroups = (dataLinks) => {
    const groupList = dataLinks.map(item => {
        return(
            {
                id: item.attributes.group.data.id,
                name: item.attributes.group.data.attributes.name,
                priority: item.attributes.group.data.attributes.priority
            }
        )
    })
    const uniqueValues = groupList.reduce((a,v)=>{
        if (!a.map(item=>item.id).includes(v.id)) {
            a.push(v)
        }
        return(a)
    },[])
    const orderedByPriority = uniqueValues.sort((a,b)=>a.priority>b.priority?-1:a.priority<b.priority?1:0)

    return orderedByPriority
}

const filterAllBySearch = (allData, filter) => {
    const filteredData = allData.filter(item => item.attributes.group.data.attributes.name.toLowerCase().includes(filter.toLowerCase()) || item.attributes.name.toLowerCase().includes(filter.toLowerCase()) || item.attributes.description.toLowerCase().includes(filter.toLowerCase()) )
    return filteredData 
}

const LinksPageTemplate = ({ getGroup, getLinks }) => {

    
    const [dataFilter,setDataFilter] = useState(filterAll)
    const [dataLinks,setDataLinks] = useState(getLinks.data)
    const [searchValue, setSearchValue] = useState("")


    const groups = extractGroups(dataLinks)

    const changeSelection = (id) => {
        if (id === "NSS") {
            setDataFilter(filterNSS)
            setDataLinks(filterGroupByWord(getLinks.data,"NSS"))
        } else if (id === "PACO") {
            setDataFilter(filterPACO)
            setDataLinks(filterGroupByWord(getLinks.data,"PACO"))
        } else {
            setDataFilter(filterAll)
            setDataLinks(filterGroupByWord(getLinks.data,""))
        }
        setSearchValue("")
    }

    const onChangeSearch = (e) => {
        console.log(e.target.value)
        setSearchValue(e.target.value)
        setDataLinks(filterAllBySearch(getLinks.data,e.target.value))
        setDataFilter(filterAll)
    }
   
    return(
        <div className="w-full h-full">
            <Submenu>
                <FilterGroup searchValue={searchValue} onChangeSearch={onChangeSearch} changeSelection={changeSelection} dataFilter={dataFilter} />
            </Submenu>
            <div className="w-full p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  ">
                {
                    groups.map(item =>
                        <LinkGroup key={item.id} groupName={item.name} dataLinks={dataLinks} />
                    )
                }
            </div>
        </div>
    )
}

export default LinksPageTemplate