"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'

//const states = ["Activo","Culminado"]
const pending = "Pendiente"
const closed = "Finalizado"
const states = [
    {
        value:pending,
        selected:false
    },
    {
        value:closed,
        selected:false
    }
]

const changeSelectStateFormat = (states,state) => {
    const newState = states.map( item => {
        if (item.value === state) {
            return ({
                ...item,
                selected: true
            })
        } else {
            return ({
                ...item,
                selected: false
            })
        }
    })
    return newState
}

const toFlatState = (state) => {
    let response = pending
    const flatState = state.find( item => item.selected)
    if (flatState) {
        response = flatState.value
    }
    return response
}

const secondJS = 1000
const minuteJS = 60 * secondJS
const hourJS = 60 * minuteJS

const minus5hours = (dataTime) => {
    return new Date(Date.parse(dataTime) - 5*hourJS)
}

const changeDateToInputFormat = (dataTimeString) => {
    const toDate = new Date(dataTimeString)
    return minus5hours(toDate).toISOString('es-ES').substring(0,16)
}

// tryToDb
// nothing
// inprogress
// fault 
// success
const tryToDbStates = {
    nothing: "nothing",
    inprogress: "inprogress",
    fault: "fault",
    success: "success",
}

const fillNullsInObject = (obj) => {
    return Object.entries(obj).reduce((newObj,[id,value]) => {
        newObj[id] = value || ""
        return newObj
    }, {})  
}

export default function FaultTrackingItemTemplate ({ dataItem,id }) {

    const router = useRouter()

    const [canEdit,setCanEdit] = useState(false)
    const [showInfo, setShowInfo] = useState(1)
    const [dataForm,setDataForm] = useState(fillNullsInObject(dataItem))
    const [tryToDb,setTryToDb] = useState(tryToDbStates.nothing)
    console.log("dataForm")
    console.log(dataForm)
    const updateForm = async (newDataForm) => {
        const areYouSure = window.confirm("La información se actualizará en la base de datos. ¿Desea continuar?")
        if (areYouSure) {
            const {id,state,title,starttime,endtime,alarms,message,ticket} = newDataForm
            console.log("Actualizando...")
            setTryToDb(tryToDbStates.inprogress)
            
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id,
                        state,
                        title,
                        starttime,
                        endtime,
                        alarms,
                        message,
                        ticket
                    })
                }
                const api = "http://172.19.128.128:3060/api/faulttracking"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo) 
                setTryToDb(tryToDbStates.success)   
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                setTryToDb(tryToDbStates.fault)   
            }

        }
    }

    const newForm = async () => {
        const areYouSure = window.confirm("Se creará un nuevo evento en la base de datos. ¿Desea continuar?")
        if (areYouSure) {
            console.log("Creando...")
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: 4,
                        state: "Pendiente",
                        title: "Desde Web mejorando",
                        starttime: "2024-08-30T01:24:30.000Z",
                        endtime: "2024-08-30T01:24:30.000Z",
                        alarms: "akasfdkadsj fñkasñlkjsalkdfj añslkjf alksñ jflñkas",
                        message: "askldjfasdjf klasjdf kasjdfñ lkasjflñkasj dfñlaj"
                    })
                }
                const api = "http://172.19.128.128:3060/api/faulttracking"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo)    
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
            }
        }
    }

    // console.log("textArea")
    // console.log(textArea)
    
    const params = useParams()
    //console.log(params.id)

    const sharedStyles = `text-center transition ease-in-out flex items-center justify-center h-full border-[1px] border-red-400`

    const alarmStyle = sharedStyles
    const alarmUnseletedStyle = `${alarmStyle} bg-red-400 text-white`
    const alarmSeletedStyle = `${alarmStyle} bg-white text-red-500`
    
    const messageStyle = sharedStyles
    const messageUnseletedStyle = `${messageStyle} bg-red-400 text-white`
    const messageSeletedStyle = `${messageStyle} bg-white text-red-500`


    const blockSharedStyle = `h-full w-full`

    const blockAlarmsSharedStyle = `${blockSharedStyle}`
    const blockAlarmsSelectedStyle = `${blockAlarmsSharedStyle}`
    const blockAlarmsUnselectedStyle = `${blockAlarmsSharedStyle} hidden`

    const blockMessageSharedStyle = `${blockSharedStyle}`
    const blockMessageSelectedStyle = `${blockMessageSharedStyle}`
    const blockMessageUnselectedStyle = `${blockMessageSharedStyle} hidden`

    const labelSyles = `text-sm text-red-500`

    const isThereMessage = () => {
        if (dataForm.message) {
            return "SI"
        } else {
            return "NO"
        }
    }

    const onChangeState = (e) => {
        setDataForm({
            ...dataForm,
            state: e.target.value
        })
    }

    const onChangeStartTime = (e) => {
        setDataForm(
            {
                ...dataForm,
                starttime: e.$d
            }
        )
    }

    const onChangeEndTime = (e) => {
        setDataForm(
            {
                ...dataForm,
                endtime: e.$d
            }
        )
    }

    const onChangeAlarms = (e) => {
        setDataForm(
            {
                ...dataForm,
                alarms: e.target.value
            }
        )
    }

    const onChangeMessage = (e) => {
        setDataForm(
            {
                ...dataForm,
                message: e.target.value
            }
        )
    }

    const onChangeTitle = (e) => {
        setDataForm(
            {
                ...dataForm,
                title: e.target.value
            }
        )
    }

    const onChangeTicket = (e) => {
        setDataForm(
            {
                ...dataForm,
                ticket: e.target.value 
            }
        )
    }

    return(
        <div className="h-full w-ful grid grid-rows-[50px_50px_1fr] ">
            <div className="h-[50px] w-full  ">
                <>
                    {
                        tryToDb === tryToDbStates.nothing
                        &&
                        <div className="h-full w-full bg-yellow-400 text-white flex justify-center items-center font-bold"></div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.inprogress
                        &&
                        <div className="h-full w-full bg-yellow-400 text-white flex justify-center items-center font-bold">Actualizando información...</div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.fault
                        &&
                        <div className="h-full w-full bg-red-400 text-white flex justify-center items-center font-bold">Sucedio un error al cargar la información a la base de datos!!!</div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.success
                        &&
                        <div className="h-full w-full bg-green-400 text-white flex justify-center items-center font-bold">Información actualizada!!!</div>
                        
                        
                    }
                </>
            </div>
            <div
                className="w-full flex justify-end p-2"
            >
                <div
                    onClick={() => setCanEdit(!canEdit)} 
                    className={`h-[50px] w-[50px] rounded-full p-2 mr-2 ${canEdit?"bg-red-400":"bg-yellow-400"} `}              
                >
                    {
                        canEdit
                        ?
                        <CloseSharpIcon style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} />
                        :
                        <EditNoteSharpIcon style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} />
                    }
                </div>
                <div
                    onClick={() => router.push('/ipmpls/faulttracking')} 
                    className={`h-[50px] w-[50px] rounded-full p-2 bg-red-400`}
                >
                    <ArrowBackIcon style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} />
                </div>
            </div>
            <div className="p-4 w-full h-full overflow-hidden">
                <div className="grid grid-rows-[80px_80px_80px_1fr] h-full w-full bg-white border-[1px] border-red-300 p-4 rounded-md ">
                    <div className="w-full flex justify-between">
                        <div className="flex">
                            <div className="mr-4">
                                <div className={labelSyles}>
                                    ESTADO
                                </div>
                                <div>
                                    <select 
                                        name="selectState" 
                                        disabled={!canEdit} 
                                        onChange={onChangeState} 
                                        defaultValue={dataForm.state} 
                                        className={`h-12 w-40 rounded-sm p-2 border-[#d4a5a5] border-[1px] text-black disabled:text-black ${canEdit?"bg-whie border-[#d4a5a5] ":"bg-gray-200"}`}
                                    >
                                        {
                                            states.map(item => 
                                                <option key={item.value} value={item.value} >{item.value}</option> 
                                            )
                                        }

                                    </select>
                                </div>

                            </div>
                            <div>
                                <div className={labelSyles}>
                                        INCIDENCIA
                                </div>
                                <div>
                                        <input 
                                            type="text" 
                                            disabled={!canEdit} 
                                            value={dataForm.ticket} 
                                            onChange={onChangeTicket} 
                                            className={`h-12 w-[600px] rounded-sm p-2 border-[#d4a5a5] border-[1px] bg-transparent text-black disabled:border-[#d4a5a5] text-black  ${canEdit?"bg-white":"bg-gray-200"}`}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full items-center">
                            {
                                canEdit && !(tryToDb === tryToDbStates.inprogress)
                                &&
                                <button 
                                    className="flex p-4 bg-yellow-400 text-white items-center font-bold rounded-sm"
                                    onClick={() => updateForm(dataForm)}
                                >
                                    GRABAR
                                </button>

                            }
                        </div>
                    </div>
                    <div>
                        <div className={labelSyles}>
                                FALLA
                        </div>
                        <div>
                                <input 
                                    type="text" 
                                    disabled={!canEdit} 
                                    value={dataForm.title} 
                                    onChange={onChangeTitle} 
                                    className={`h-12 w-[600px] rounded-sm p-2 border-[#d4a5a5] border-[1px] bg-transparen disabled:border-[#d4a5a5] text-black  ${canEdit?"bg-white":"bg-gray-200"}`}
                                />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <div className={labelSyles}>
                                INICIO
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker 
                                    value={dayjs(dataForm.starttime)}
                                    onChange={onChangeStartTime}
                                    format="DD/MM/YYYY hh:mm a"
                                    readOnly = {!canEdit}
                                    className= {`border-[1px] ${canEdit?"bg-gray-white border-yellow-400 text-yellow-400":"bg-gray-200 border-gray-400"}`}
     
                                />
                            </LocalizationProvider>
                            {/* <input type="datetime-local" disabled={!canEdit} onChange={onChangeStartTime} value={changeDateToInputFormat(dataForm.starttime)} /> */}
                        </div>
                        <div>
                            <div className={labelSyles}>
                                FIN
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker 
                                    value={dayjs(dataForm.endtime)}
                                    onChange={onChangeEndTime}
                                    format="DD/MM/YYYY hh:mm a"
                                    readOnly = {!canEdit}
                                    className= {`border-[1px] ${canEdit?"bg-gray-white border-yellow-400 text-yellow-800":"bg-gray-200 border-gray-400"}`}
                                />
                            </LocalizationProvider>
                            {/* <input type="datetime-local" disabled={!canEdit} onChange={onChangeEndTime} value={changeDateToInputFormat(dataForm.endtime)} /> */}
                        </div>
                    </div>
                    <div className="h-full w-full grid grid-rows-[40px_1fr] overflow-hidden mt-4">
                        <div className="grid w-full h-full grid-cols-2">
                            <div 
                                className={showInfo===1?alarmSeletedStyle:alarmUnseletedStyle}
                                onClick={()=>setShowInfo(1)}
                            >
                                Alarmas
                            </div>
                            <div 
                                className={showInfo===2?messageSeletedStyle:messageUnseletedStyle}
                                onClick={()=>setShowInfo(2)}    
                            >
                                {`Mensaje (${isThereMessage()})`}
                            </div>
                        </div>
                        <div className="h-full w-full">
                            <div
                                className={showInfo===1?blockAlarmsSelectedStyle:blockAlarmsUnselectedStyle}
                            >
                                <textarea 
                                    className={`h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black ${canEdit?"bg-white":"bg-gray-200"}`} 
                                    onChange={canEdit?onChangeAlarms:()=>{}} 
                                    value={dataForm.alarms} 
                                />
                                
                            </div>
                            <div
                                className={showInfo===2?blockMessageSelectedStyle:blockMessageUnselectedStyle}
                            >
                                <textarea 
                                    className={`h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black ${canEdit?"bg-white":"bg-gray-200"}`} 
                                    onChange={canEdit?onChangeMessage:()=>{}} 
                                    value={dataForm.message} 
                                />
                                    
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}