"use client"

import Link from "next/link"
import { useEffect, useState } from "react"


export default function ProceduresTemplate () {

    const [groupList,setGroupList] = useState("")
    console.log(groupList)
    

    useEffect(()=>{
        const api = "http://172.19.128.128:3060/api/csps/procedures/group"
        fetch(api,{cache: "no-store"})
            .then(res => res.json())
            .then(data => setGroupList(data.data))
    },[])

    const folders = [
        {
            tag: "Roaming",
            id: "roaming"
        },
        {
            tag: "os",
            id: "os"
        }
    ]

    return (
        <div className="p-2">
            <div className="text-[18px] p-2">
                Archivos:
            </div>
            <div className="border-t-[1px] border-red-500">
                {
                    groupList
                    ?
                    groupList.map( item => 
                        <Link 
                            key={item.id} 
                            className="flex flex-col p-2 border-[1px] border-red-500 border-t-0" 
                            href={`/csps/procedures/${item.folder}-${item.id}`} 
                        >
                            {
                                item.name
                            }
                        </Link>
                    )
                    :
                    "Cargando..."
                }
            </div>
        </div>
    )
}