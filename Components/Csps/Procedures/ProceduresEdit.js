"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function ProceduresEdit ({ params }) {

    const router = useRouter()
    const { folder, editid} = params

    console.log(folder)

    const [dataItem,setDataItem] = useState("")
    const [itemFinded,setItemFinded] = useState("")
    console.log("dataItem")
    console.log(dataItem)
    //const itemFinded = dataItem?dataItem.find(item => item.id === editid):""
    console.log("itemFinded")
    console.log(itemFinded)
    useEffect(()=>{
        const api = "http://172.19.128.128:3060/api/csps/procedures/item"
        fetch(api,{cache:"no-store"})
            .then( res => res.json())
            .then( data => {
                setDataItem(data.data)
                setItemFinded({
                    ...data.data.find(item => item.id === editid),
                    changed: false
                })                
            })
    },[])

    const updateData = async (item) => {
        const methodHttp = 'POST'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'text/plain'},
                body: JSON.stringify(item)
            }
            const api = "http://172.19.128.128:3060/api/csps/procedures/item"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Actualizada!!") 
            // setStateDb(statesMessages.saved)
            // setDataLinkGroup(addToDo(dataLinkGroup))
            // if (params.id === "new") {
            router.push(`/csps/procedures/${folder}`)
            // }

        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setStateDb(statesMessages.failed)
        }
    }

    const deleteData = async (item) => {
        const methodHttp = 'DELETE'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            }
            const api = "http://172.19.128.128:3060/api/csps/procedures/item"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Borrada!!") 
            // setStateDb(statesMessages.saved)
            // setDataLinkGroup(addToDo(dataLinkGroup))
            // if (params.id === "new") {
            //     router.push("/general/links")
            // }
            router.push(`/csps/procedures/${folder}`)

        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setStateDb(statesMessages.failed)
        }
    }

   

    return(
        <div className="p-4">
            <div className="flex justify-end">
                <Link href={`/csps/procedures/${folder}`}>
                    <ArrowBackIcon className="text-red-500" />
                </Link>
            </div>
            <div className="">
                {
                    dataItem
                    ?
                    (
                        itemFinded
                        ?
                        <div>
                            <div className="flex justify-between w-[100px]">
                                <div className="h-[40px] w-[40px] cursor-pointer">
                                    <DeleteForeverIcon className="text-red-500 h-full w-full" onClick={()=>deleteData(itemFinded)} />
                                </div>
                                {
                                    itemFinded.changed
                                    ?
                                    <div className="h-[40px] w-[40px] cursor-pointer" onClick={()=>updateData(itemFinded)}>
                                        <SaveIcon className="text-yellow-500 h-full w-full" />
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    value={itemFinded.name}
                                    className="border-[1px] border-red-500 p-2 " 
                                    onChange={(e)=>setItemFinded({
                                        ...itemFinded,
                                        name: e.target.value,
                                        changed: true
                                    })}
                                />
                                <div>
                                    {
                                        itemFinded.file
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        "No se encontro elemento"
                    )
                    :
                    "Cargando..."
                }
            </div>
        </div>
    )
}