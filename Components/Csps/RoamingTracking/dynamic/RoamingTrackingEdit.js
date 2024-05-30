"use client"

import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const newDataRoaming = {
    id: "new",
    title: "Afectación",
    starttime: dayjs(new Date()),
    endtime: dayjs(new Date()),
    outtime: 0,
    indicators: "",
    impact: "",
    reason: "",
    complains: false,
    boticket: "",
    inocticket: "",
    notes: ""
}

const getDiff = (start,end) => {
    const formatStart = dayjs(start)
    const formatEnd = dayjs(end)

    return {
        hours: formatEnd.diff(formatStart,"hour"),
        minutes: formatEnd.diff(formatStart,"minute")%60
    } 
    
}

const validateNumberDecimal = (valueString) => {
    const pointNumberRegex = /[0-9.]+/g
    const listFinded = valueString.match(pointNumberRegex)
    if (listFinded.length) {
        return listFinded[0].split("").reduce((a,v)=>{
            console.log("pointCounter")
            console.log(a.pointCounter)
            if(v === ".") {
                const pcounter = a.pointCounter + 1
                if (pcounter > 1) {
                    return {
                        ...a,
                        pointCounter: pcounter,
                    }
                } else {
                    return {
                        ...a,
                        pointCounter: pcounter,
                        stringJoin: a.stringJoin + v
                    }
                }
            } else {
                if (a.pointCounter > 0) {
                    const dcounter = a.decimalCounter + 1
                    if (dcounter > 2) {
                        return {
                            ...a,
                            decimalCounter: dcounter
                        }
                    } else {
                        return {
                            ...a,
                            decimalCounter: dcounter,
                            stringJoin: a.stringJoin + v
                        }
                    }
                } else {
                    return {
                        ...a,
                        stringJoin: a.stringJoin + v
                    }
                }
            }
        },{stringJoin:"",pointCounter:0,decimalCounter:0}).stringJoin
    } else {
        return ""
    }
}

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

export default function RoamingTrackingEdit({ params }) {

    const router = useRouter()

    const [canEdit,setCanEdit] = useState(params.id==="new"?true:false)
    const [dataRoaming,setDataRoaming] = useState(params.id==="new"?newDataRoaming:"")
    const [stateDb,setStateDb] = useState(statesMessages.none)
    const [areThereChanges,setAreThereChanges] = useState(false)
    const [firstData,setFirstData] = useState("")

    console.log("dataRoaming")
    console.log(dataRoaming)

    const timeDiff = getDiff(dataRoaming.starttime,dataRoaming.endtime)

    useEffect(()=>{
        if (/^[0-9]*$/.test(params.id)) {
            const url = `http://172.19.128.128:3060/api/roamingtracking/${params.id}`
            fetch(url,{cache:"no-store"})
                .then(res => res.json())
                .then(data => {
                    setDataRoaming(data.data[0])
                    setFirstData(data.data[0])
                })
        }
    },[])

    const onChangeForm = (e) => {
        setAreThereChanges(true)
        console.log(e)
        const {name,value} = e.target
        console.log(name,value)
        if (name === "complains") {
            setDataRoaming({
                ...dataRoaming,
                complains: e.target.checked
            })
        } else if (name === "outtime") {
            setDataRoaming({
                ...dataRoaming,
                outtime: value?validateNumberDecimal(value):""
            })
        } else {
            setDataRoaming({
                ...dataRoaming,
                [name]: value
            })
        }
    }
    
    const onChangeStartTime = (e) => {
        setAreThereChanges(true)
        setDataRoaming({
            ...dataRoaming,
            starttime: e.$d
        })
    } 

    const onChangeEndTime = (e) => {
        setAreThereChanges(true)
        setDataRoaming({
            ...dataRoaming,
            endtime: e.$d
        })
    } 

    const onSaveData = async () => {
        //setStateDb(statesMessages.inProgress)
        const methodHttp = params.id === "new"?'POST':'PUT'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataRoaming)
            }
            const api = "http://172.19.128.128:3060/api/roamingtracking"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            setStateDb(statesMessages.saved)
            //setDataLinkGroup(addToDo(dataLinkGroup))
            if (params.id === "new") {
                router.push("/csps/roamingtracking")
            } else {
                setAreThereChanges(false)
                setCanEdit(false)
            }
    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            setStateDb(statesMessages.failed)
        }
    }

    const onClickClose = () => {
        if (areThereChanges) {
            const areYouSure = window.confirm("Se perdera los cambios ¿Desea continuar?")
            if (areYouSure) {
                if (params.id === "new") {
                    router.push("/csps/roamingtracking")
                } else {
                    setCanEdit(false)
                    setDataRoaming(firstData)
                }
            }
        } else {
            if (params.id === "new") {
                router.push("/csps/roamingtracking")
            } else {
                setCanEdit(false)
            }
        }
    }

    const onClickEdit = () => {
        setCanEdit(true)
        setAreThereChanges(false)
    }

    return(
        <div>
            {
                /^[0-9]*$/.test(params.id) || params.id === "new"
                ?
                    (dataRoaming
                    ?
                    <div>
                        <div className="h-[50px] w-full">
                            <div className={`h-full w-full flex text-center justify-center items-center text-white ${stateDb === statesMessages.inProgress?"bg-yellow-400":(stateDb === statesMessages.saved?"bg-green-400":(stateDb === statesMessages.failed?"bg-red-400":"bg-green-400"))}`}>
                                {
                                    stateDb
                                }
                            </div>
                        </div>
                        <div className='h-[50px] w-full flex justify-end items-center'>
                            {
                                canEdit
                                ?
                                <div className='flex items-center' >
                                    <div className='flex items-center h-[50px] w-[50px] p-2'>
                                        <SaveIcon className="text-yellow-400 h-full w-full" onClick={onSaveData} />
                                    </div>
                                    <div className='flex items-center h-[50px] w-[50px] p-2'>
                                        <CloseIcon className="h-full w-full text-red-400" onClick={onClickClose} />
                                    </div>
                                </div>
                                :
                                <div className='flex items-center'>
                                    <div className='flex items-center h-[50px] w-[50px] p-2'>
                                        <ArrowBackIcon className="h-full w-full text-red-400" onClick={() => router.push("/csps/roamingtracking")} />
                                    </div>
                                    <div className='flex items-center h-[50px] w-[50px] p-2'>
                                        <EditIcon className="text-yellow-400 h-full w-full" onClick={onClickEdit} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='grid grid-rows-10 rounded-md gap-2 border-[1px] border-red-400' >
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='flex items-center'>
                                        Evento:
                                    </div>
                                    <input 
                                        className={`rounded-md w-full py-2 ${canEdit?"bg-gray-300 bg-gray-300":"bg-transparent"} `} 
                                        type="text" 
                                        value={dataRoaming.title} 
                                        name={'title'} 
                                        onChange={(e)=>canEdit&&onChangeForm(e)}
                                    />                
                                </div>
                            </div>
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>

                                    <div  className='flex items-center'>
                                        Tiempos
                                    </div>
                                    <div className='grid grid-cols-3 gap-2'>
                                        <div className='flex items-center '>
                                            <div className=''>
                                                Inicio:
                                            </div>
                                            <div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker 
                                                        // value={dayjs(dataForm.starttime)}
                                                        name={"starttime"}
                                                        value = {dayjs(dataRoaming.starttime)}
                                                        onChange={(e)=>canEdit&&onChangeStartTime(e)}
                                                        format="DD/MM/YYYY hh:mm a"
                                                        readOnly = {!canEdit}
                                                        timeSteps = { {hours:1, minutes:1 } }
                                                        className= {` ${canEdit?"bg-gray-300":"bg-transparent"}`}

                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className='flex items-center '>
                                            <div className=''>
                                                Fin:
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker 
                                                    // value={dayjs(dataForm.starttime)}
                                                    name={"endtime"}
                                                    value = {dayjs(dataRoaming.endtime)}
                                                    onChange={(e)=>canEdit&&onChangeEndTime(e)}
                                                    format="DD/MM/YYYY hh:mm a"
                                                    readOnly = {!canEdit}
                                                    timeSteps = { {hours:1, minutes:1 } }
                                                    className= {` ${canEdit?"bg-gray-300":"bg-transparent"}`}

                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='mr-2'>
                                                Duracion del evento:
                                            </div>
                                            <div>
                                                {
                                                `${timeDiff.hours} h ${timeDiff.minutes} m`
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div  className='flex items-center'>
                                        Tiempo de afectación (horas):
                                    </div>
                                    <input className={`rounded-md w-full ${canEdit?"bg-gray-300":"bg-transparent"}`}  type='text' value={dataRoaming.outtime} name={"outtime"} onChange={(e)=>canEdit&&onChangeForm(e)}/>

                                </div>
                            </div>
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div  className='w-[200px]'>
                                        ¿Reclamos Atención Roaming?
                                    </div>
                                    <div className='flex items-center'>
                                        <input className='rounded-md h-[25px] w-[25px] bg-red-300 ' type='checkbox' value={dataRoaming.complains} checked={dataRoaming.complains} name={"complains"} onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                    </div>
                                </div>
                            </div>
                            <div className=' border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Indicadores o gráficas afectadas:
                                    </div>
                                    <input className={`py-2 rounded-md w-full ${canEdit?" bg-gray-300":"bg-transparent"}`} type='text' value={dataRoaming.indicators} name={"indicators"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>
                            </div>
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Impacto:
                                    </div>
                                    <input className={`py-2 rounded-md w-full ${canEdit?" bg-gray-300":"bg-transparent"}`} type='text' value={dataRoaming.impact}  name={"impact"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>
                            </div>
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Causa:
                                    </div>
                                    <input className={`py-2 rounded-md w-full ${canEdit?" bg-gray-300":"bg-transparent"}`} type='text' value={dataRoaming.reason} name={"reason"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>
                            </div>

                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Ticket Backoffice:
                                    </div>
                                    <input className={`py-2 rounded-md w-full ${canEdit?" bg-gray-300":"bg-transparent"}`} type='text' value={dataRoaming.boticket} name={"boticket"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>
                            </div>
                            <div className='border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Ticket INOC:
                                    </div>
                                    <input className={`py-2 rounded-md w-full ${canEdit?" bg-gray-300":"bg-transparent"}`} type='text' value={dataRoaming.inocticket} name={"inocticket"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>  
                            </div>
          
                            <div className='items-center mb-2  border-b-[1px] border-red-400'>
                                <div className='grid grid-cols-[200px_1fr] px-2 pt-2'>
                                    <div className='w-[200px]'>
                                        Notas:
                                    </div>
                                    <textarea className={`w-full h-[200px] ${canEdit?" bg-gray-300":"bg-transparent"}`} value={dataRoaming.notes} name={"notes"}  onChange={(e)=>canEdit&&onChangeForm(e)}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    "Cargando...")
                :
                "Id Incorrecto"
            }
        </div>
    )
}
