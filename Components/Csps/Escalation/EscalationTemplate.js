"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

const orderByTitle = (data) => {
    return data.sort((a,b) => a.title.localCompare(b.title))
}

export default function () {

    const [filter,setFilter] = useState("")
    const [dataToShow,setDataToShow] = useState("")
    const [dataFiltered, setDataFiltered] = useState("")
    const [canEdit,setCanEdit] = useState(false)

    useEffect(()=>{
        fetch("http://172.19.128.128:3060/api/providercontactlines",{ cache: 'no-cache'})
            .then(res => res.json())
            .then(data => {
                setDataToShow(data.data)
                setDataFiltered(data.data)
            } )
    },[])

    const changeFilter = (e) => {
        setFilter(e.target.value)
        setDataFiltered(dataToShow.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    
    const router = useRouter()
    
    return(
        <div className="h-full w-full">
            {
                dataToShow
                ?
                <div className="h-full w-full">

                    <div className="h-[50px] bg-red-500 flex justify-between">
                        <div className="h-full flex items-center ml-2">
                            <input type="text" className="p-2 rounded-md" value={filter} onChange={changeFilter} />
                        </div>
                        <div className="h-full flex items-center mr-2">
                            <div className="h-[50px] w-[50px] flex items-center justify-center p-2">
                                <AddBoxIcon className="text-yellow-400 h-full w-full" onClick={()=>router.push(`/csps/escalation/edit/new`)} />
                            </div>
                            {
                                canEdit
                                ?
                                <div className="h-[50px] w-[50px] flex items-center justify-center p-2">
                                    <CloseIcon className="text-white h-full w-full" onClick={()=>setCanEdit(false)} />
                                </div>
                                :
                                <div className="h-[50px] w-[50px] flex items-center justify-center p-2">
                                    <EditIcon className="text-yellow-400 h-full w-full" onClick={()=>setCanEdit(true)} />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="h-full w-full grid grid-cols-2 p-4 gap-4">
                            {
                                dataFiltered.map( item => 
                                    <div key={item.id} className="w-full h-full rounded-md border-[1px] border-red-500 overflow-hidden">
                                        <div className="bg-red-500 text-white p-2">
                                            <div>
                                                {
                                                    canEdit
                                                    ?
                                                    <EditIcon className="text-yellow-400" onClick={()=>router.push(`/csps/escalation/edit/${item.id}`)} />
                                                    :
                                                    ""
                                                }
                                                {
                                                    item.title
                                                }
                                            </div>
                                        </div>
                                        <div className="" >
                                            {   
                                                item.lines
                                                &&
                                                item.lines.map(item =>
                                                    <div key={item.id} className="p-2 border-b-[1px] border-gray-300">
                                                        <div>
                                                            {
                                                                item.line
                                                            }
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            }
                                        </div>
                                    </div>
                                    
                                )
                            }
                        </div>
                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}