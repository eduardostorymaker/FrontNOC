"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Submenu from "../../Menu/Submenu"
import RoamingContactFilter from "./RoamingContactFilter"
import RoamingContactGroup from "./RoamingContactGroup"

const dataFilterByWord = (data,word) => {
    const dataFiltered = data.filter(item=> item.country.toLowerCase().includes(word.toLowerCase()) || item.operator.toLowerCase().includes(word.toLowerCase()))
    return dataFiltered
}

export default function () {
    const router = useRouter()
    const [dataRoaming,setDataRoaming] = useState("")
    const [searchValue,setSearchValue] =  useState("")
    const [canEdit,setCanEdit] = useState(false)
    const dataRoamingFiltered = dataRoaming?dataFilterByWord(dataRoaming,searchValue):""

    useEffect(()=>{
        const url = "http://172.19.128.128:3060/api/roamingoperator"
        fetch(url,{cache: "no-store"})
            .then( res => res.json())
            .then( data => setDataRoaming(data.data))
    },[])

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataRoamingFiltered(dataFilterByWord(dataRoaming,e.target.value))
    }

    return(
        <div>
            {
                dataRoaming
                ?
                <div className="w-full ">
                    <div className="w-full h-[50px] bg-red-500 px-2 flex justify-between">
                        <div className="h-full flex items-center">
                            <input className="p-2 rounded-md" type="text" onChange={onChangeSearch} />
                        </div>
                        <div className="h-full flex items-center ">
                            {
                                canEdit
                                ?
                                <div className="flex items-center">
                                    <div className="h-full p-2" onClick={()=>router.push('/csps/roamingcontact/new')} >
                                        <div className="p-2 text-white bg-yellow-400">
                                            Nuevo
                                        </div>
                                    </div>
                                    <div className="h-full p-2" onClick={()=>setCanEdit(false)} >
                                        <CloseIcon className="text-white h-full" />
                                    </div>
                                </div>
                                :
                                <div className="h-full p-2" onClick={()=>setCanEdit(true)} >
                                    <EditIcon className="text-yellow-400 h-full" />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <RoamingContactGroup dataRoamingFiltered={dataRoamingFiltered} canEdit={canEdit} />
                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}