"use client"
import { useState } from "react"

import Submenu from "../../Menu/Submenu"
import ProviderContactFilter from "./ProviderContactFilter"
import ProviderContactGroup from "./ProviderContactGroup"

const dataFilterByWord = (data,word) => {
    const dataFiltered = data.filter(item=> item.attributes?.provider?.toLowerCase().includes(word.toLowerCase()) || item.attributes?.providertype?.data?.attributes?.name?.toLowerCase().includes(word.toLowerCase()))
    return dataFiltered
}

export default function ProviderContactTemplate({ providerData }) {

    const [providerDataFiltered,setProviderDataFiltered] = useState(providerData)
    const [searchValue, setSearchValue] = useState("")

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setProviderDataFiltered(dataFilterByWord(providerData,e.target.value))
    }

    return(
        <div className="w-full">
            <Submenu>
                <ProviderContactFilter searchValue={searchValue} onChangeSearch={onChangeSearch} />
            </Submenu>
            <div>
                <ProviderContactGroup providerDataFiltered={providerDataFiltered} />
            </div>
        </div>
    )
}