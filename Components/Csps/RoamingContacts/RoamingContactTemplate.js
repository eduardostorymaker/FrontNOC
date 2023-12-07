"use client"

import { useState } from "react"

import Submenu from "../../Menu/Submenu"
import RoamingContactFilter from "./RoamingContactFilter"
import RoamingContactGroup from "./RoamingContactGroup"

const dataFilterByWord = (data,word) => {
    const dataFiltered = data.filter(item=> item.attributes.name.toLowerCase().includes(word.toLowerCase()) || item.attributes?.country?.data?.attributes?.name.toLowerCase().includes(word.toLowerCase()))
    return dataFiltered
}

export default function ({ dataRoaming }) {

    const [dataRoamingFiltered,setDataRoamingFiltered] = useState(dataRoaming)
    const [searchValue,setSearchValue] =  useState("")

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataRoamingFiltered(dataFilterByWord(dataRoaming,e.target.value))
    }

    return(
        <div className="w-full">
            <Submenu >
                <RoamingContactFilter searchValue={searchValue} onChangeSearch={onChangeSearch} />
            </Submenu>
            <div>
                <RoamingContactGroup dataRoamingFiltered={dataRoamingFiltered} />
            </div>
        </div>
    )
}