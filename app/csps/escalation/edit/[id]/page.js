"use client"

import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from "react"

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

const orderByPriority = (data) => {
    return data.sort((a,b) => a.priority-b.priority)
}

const dataProviderNew = {
    id:1,
    title: "Proveedor"
}

const dataLinesNew = [{
    id:1,
    line: "Escalamiento",
    priority: 1
}]

const actionToDo = {
    add: "add",
    delete: "delete",
    modified: "modified",
    none: "none" 
}

const addDbStateArray = (data) => {
    return data.map(item => {
        return {
            ...item,
            todo:actionToDo.none
        }
    })
}

export default function escalationedit ({params}) {

    const [dataProvider,setDataProvider] = useState(params.id==="new"?dataProviderNew:"")
    const [dataLines,setDataLines] = useState(params.id==="new"?dataLinesNew:"")
    const [stateDb,setStateDb] = useState(statesMessages.none)
    const dataToShow = dataLines?dataLines.filter(item => item.todo !== actionToDo.delete):""

    const router = useRouter()

    useEffect(()=>{
        if (/^\d+$/.test(params.id)) {
            const urlProvider = `http://172.19.128.128:3060/api/providercontact/${params.id}` 
            fetch(urlProvider,{cache:'no-cache'})
                .then( res => res.json())
                .then( data => setDataProvider(data.data[0]))
    
            const urlLines = `http://172.19.128.128:3060/api/providercontactlines/${params.id}` 
            fetch(urlLines,{cache:'no-cache'})
                .then( res => res.json())
                .then( data => setDataLines(orderByPriority(addDbStateArray(data.data))) )    

        }
    },[])

    console.log(JSON.stringify({
        dataProvider,
        dataLines
    }))

    const onChangeProvider = (e) => {
        setDataProvider({
            ... dataProvider,
            title: e.target.value
        })
        setStateDb(statesMessages.none)
    }

    const onChangeLines = (e) => {
       console.log(e.target.id)
       const newData = dataLines.map(item => {
        if (parseInt(e.target.id) === parseInt(item.id)) {
            return({
                ...item,
                line: e.target.value,
                todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
            })
        } else {
            return({
                ...item
            })
        }
       })
       setDataLines(newData)
       setStateDb(statesMessages.none)
    }

    const onChangeLinesOrderUp = (id,priority) => {
        const isThere = dataLines.find(item => item.priority === priority - 1)
        if (isThere) {
            const newDataLines = dataLines.map(item => {
                if (item.id === id) {
                    return ({
                        ...item,
                        priority: item.priority - 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (item.id === isThere.id) {
                    return ({
                        ...item,
                        priority: item.priority + 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return ({
                        ...item,
                    })
                }

            })
            setDataLines(orderByPriority(newDataLines))
            setStateDb(statesMessages.none)
        }
    }

    const onChangeLinesOrderDown = (id,priority) => {
        const isThere = dataLines.find(item => item.priority === priority + 1)
        console.log("isThere")
        console.log(isThere)
        if (isThere) {
            const newDataLines = dataLines.map(item => {
                if (item.id === id) {
                    return ({
                        ...item,
                        priority: item.priority + 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (item.id === isThere.id) {
                    return ({
                        ...item,
                        priority: item.priority - 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return ({
                        ...item,
                    })
                }

            })
            setDataLines(orderByPriority(newDataLines))
            setStateDb(statesMessages.none)
        }
    }

    const onSaveData = async () => {
        setStateDb(statesMessages.inProgress)
        const methodHttp = params.id === "new"?'POST':'PUT'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    dataProvider,
                    dataLines
                })
            }
            const api = "http://172.19.128.128:3060/api/providercontactlines"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            setStateDb(statesMessages.saved)

        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            setStateDb(statesMessages.failed)
        }
    }

    const addNewLine = () => {
        const lastPriority = dataLines.reduce((a,v)=>{
            return a > v.priority ? a : v.priority
        },0)
        setDataLines([
            ...dataLines,
            {
                ...dataLinesNew[0],
                priority: lastPriority + 1,
                id: lastPriority + 1,
                todo: actionToDo.add
            }
        ])
    }

    const deleteLastLine = () => {
        console.log()
        if (dataLines.length > 1) {
  
            const {id,name,value,todo} = dataLines[dataLines.length-1]
            console.log(id,name,value, todo)
            if (todo === actionToDo.add) {
                setDataLines(dataLines.slice(0,-1))
            } else {
                setDataLines(dataLines.map(item => {
                    if (parseInt(item.id)===parseInt(id)){
                        return ({
                            ...item,
                            todo: actionToDo.delete
                        })
                    } else {
                        return ({
                            ...item
                        })
                    }
                }))
            }
        }
    }

    console.log(dataLines)
    console.log(dataProvider)

    return(
        <div>
            {
                /^\d+$/.test(params.id) || params.id === "new"
                ?
                <div>
                    <div 
                        className={`h-[50px] w-full text-white 
                        ${stateDb === statesMessages.inProgress?"bg-yellow-400":(stateDb === statesMessages.saved?"bg-green-400":(stateDb === statesMessages.failed?"bg-red-400":"bg-green-400"))}`}
                    >
                        <div>
                            {
                                stateDb
                            }
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <div className='flex h-[50px] w-[50px] p-2'>
                            <ArrowBackIcon className="h-full w-full text-red-400" onClick={()=>router.push("/csps/escalation")}  />
                        </div>
                        <div className='flex h-[50px] w-[50px] p-2'>
                            <SaveIcon className="h-full w-full text-yellow-400" onClick={onSaveData}  />
                        </div>
                    </div>
                    {
                        dataProvider&&dataLines
                        ?
                        <div className="w-full h-full rounded-md border-[1px] border-red-500 overflow-hidden">
                            <div className="bg-red-500 text-white p-2">
                                <input type="text" value={dataProvider.title} className="h-full w-full bg-transparent" onChange={(e)=> onChangeProvider(e)} />
                            </div>
                            <div className="" >
                                {   
                                    dataToShow.map(item =>
                                        <div key={item.id} className="p-2 border-b-[1px] border-gray-300">
                                            <ArrowDownwardIcon onClick={()=>onChangeLinesOrderDown(item.id,item.priority)} className="text-yellow-400" />
                                            <ArrowUpwardIcon onClick={()=>onChangeLinesOrderUp(item.id,item.priority)} className="text-yellow-400" />
                                            <input type="text" id={item.id} value={item.line} className="h-full w-full bg-transparent" onChange={(e)=> onChangeLines(e)} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        :
                        <div>
                            Cargando data...
                        </div>
                    }
                    <div className='h-[50px] w-full flex '>
                        <div className='h-[50px] w-[50px]'>
                            <AddCircleIcon className="h-full w-full text-yellow-400" onClick={addNewLine} />
                        </div>
                        <div className='h-[50px] w-[50px]'>
                            <RemoveCircleIcon className="h-full w-full text-red-400" onClick={deleteLastLine} />
                        </div>
                    </div>
                </div>
                :
                "Parametro incorrecto"
            }
        </div>
    )
}