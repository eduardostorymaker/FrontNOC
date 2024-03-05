"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

//const states = ["Activo","Culminado"]
const states = [
    {
        value:"Pendiente",
        selected:false
    },
    {
        value:"Finalizado",
        selected:false
    }
]

const changeSelectState = (states,state) => {
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

export default function FaultTrackingItemTemplate ({ dataItem }) {

    const [canEdit,setCanEdit] = useState(false)
    const [showInfo, setShowInfo] = useState(1)
    const [dataForm,setDataForm] = useState({
        state: changeSelectState(states,dataItem.state),
        title: dataItem.title,
        starttime: new Date(dataItem.starttime),
        endtime: new Date(dataItem.endtime)
    })
    const {state, title, starttime, endtime} = dataForm

    console.log("state")
    console.log(state)
    
    const params = useParams()
    //console.log(params.id)

    const sharedStyles = `text-center transition ease-in-out flex items-center justify-center h-full`

    const alarmStyle = sharedStyles
    const alarmUnseletedStyle = `${alarmStyle}  `
    const alarmSeletedStyle = `${alarmStyle}  bg-white`
    
    const messageStyle = sharedStyles
    const messageUnseletedStyle = `${messageStyle}  `
    const messageSeletedStyle = `${messageStyle}  bg-white`


    const blockSharedStyle = `h-full w-full`

    const blockAlarmsSharedStyle = `${blockSharedStyle}`
    const blockAlarmsSelectedStyle = `${blockAlarmsSharedStyle}`
    const blockAlarmsUnselectedStyle = `${blockAlarmsSharedStyle} hidden`

    const blockMessageSharedStyle = `${blockSharedStyle}`
    const blockMessageSelectedStyle = `${blockMessageSharedStyle}`
    const blockMessageUnselectedStyle = `${blockMessageSharedStyle} hidden`

    const isThereMessage = () => {
        if (dataItem.message) {
            return "SI"
        } else {
            return "NO"
        }
    }

    const onChangeState = (e) => {
        setDataForm({
            ...dataForm,
            state: changeSelectState(states,e.target.value)
        })
    }

    const onChangeStartTime = (e) => {
        // setDataForm({
        //     ...dataForm,
        //     starttime: e.target.value
        // })

        console.log("datetime")
        console.log(new Date(e.target.value))
    }

    const onChangeEndTime = (e) => {
        const hoy = Date()
        console.log(e.target.value)
        //console.log(Date().toLocaleTimeString())
        console.log(hoy)
    }

    return(
        <div className="h-full w-full">
            <div
                className=""
                onClick={() => setCanEdit(!canEdit)}
            >
                {canEdit?"Si":"No"}
            </div>
            <div className="p-4 w-full h-full">
                <div className="h-[400px] w-full bg-red-300 p-4">
                    <div>
                        <div>
                            Estado
                        </div>
                        <div>
                            <select name="selectState" disabled={false} onChange={onChangeState} >
                                {
                                    states.map( item => 
                                        <option value={item.value} selected={item.selected} >{item.value}</option> 
                                    )
                                }

                            </select>
                        </div>

                    </div>
                    <div>
                        <div>
                                Falla:
                        </div>
                        <div>
                                <input type="text" value={title} />
                        </div>
                    </div>
                    <div>
                        Equipos: 
                    </div>
                    <div>
                        <div>
                            Inicio:
                        </div>
                        <input type="datetime-local" onChange={onChangeStartTime} value={starttime.toISOString().substring(0,16)} />
                    </div>
                    <div>
                        <div>
                            Fin:
                        </div>
                        <input type="datetime-local" onChange={onChangeStartTime} value={endtime.toISOString().substring(0,16)} />
                    </div>
                    <div className="flex w-full flex-col">
                        <div className="grid w-full h-[40px] grid-cols-2 ">
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
                        <div
                            className={showInfo===1?blockAlarmsSelectedStyle:blockAlarmsUnselectedStyle}
                        >
                            {
                                `Inicio: ${dataItem.alarms}`
                            }
                        </div>
                        <div
                            className={showInfo===2?blockMessageSelectedStyle:blockMessageUnselectedStyle}
                        >
                            {
                                `Inicio: ${dataItem.message}`
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}