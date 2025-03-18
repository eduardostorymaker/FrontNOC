"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function PlantillaSMSMenu () {

    const [groupList,setGroupList] = useState("")

    useEffect(()=>{
        const api = "http://172.19.128.128:3061/api/generals/plantillasms/nocgroups"
        fetch(api,{cache:"no-store"})
            .then( res => res.json())
            .then( data => setGroupList(data.data))
    },[])

    return(
        <div className="flex flex-col p-2">
            <div className="mb-2 mt-2">
                Selecciona el grupo para ver los SMS:
            </div>
            <div>
                {
                    groupList
                    ?
                    <div className="">
                        {
                            groupList.map( item =>
                                <Link className="flex p-2 bg-yellow-400 text-white w-[300px] border-b-[1px] border-white" href={`/general/plantillasms/${item.id}`} >
                                    {
                                        item.tag
                                    }
                                </Link>
                            )
                        }
                    </div>
                    :
                    "Cargando..."
                }
            </div>
        </div>
    )
}