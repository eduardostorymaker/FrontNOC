"use client"

import { useState, useEffect } from "react"
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { add } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'next/navigation'

const dataEtapa = [
    {
        id:"INICIAL",
        tag:"INICIAL"
    },
    {
        id:"ACTUALIZACIÓN",
        tag:"ACTUALIZACIÓN"
    },
    {
        id:"CIERRE",
        tag:"CIERRE"
    }
]

export default function PlantillaSMSComponent ({params}) {

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [etapa, setEtapa] = useState(dataEtapa[0].tag)
    const [ticket,setTicket] = useState('')
    const [falla,setFalla] = useState('')
    const [fechaInicio,setFechaInicio] = useState(new Date())
    const [fechaFin,setFechaFin] = useState(add(new Date(), { hours: 3 }))
    const [impacto,setImpacto] = useState(`\t*SIN AFECTACIÓN DE SERVICIOS*`)
    const [responsables,setRespondables] = useState([])
    const [actualizaciones,setActualizaciones] = useState([{hora:new Date(), actualizacion: ""}])
    const [soporteList,setSoporteList] = useState("") 

    const [groupList,setGroupList] = useState("")
    const titleSMS = groupList?groupList.find(item => item.id === params.groupid).tag:"Cargando..." 

    

    useEffect(()=>{
        const apiSoporte = "http://172.19.128.128:3061/api/generals/plantillasms/soportenoc"
        fetch(apiSoporte,{cache:"no-store"})
            .then( res => res.json())
            .then( data => setSoporteList(data.data.map( item => {
                return({
                    ...item,
                    value: item.id,
                    label: `${item.grupo} - ${item.nombre}`
                })
            })))

        if (params.smsid === "new") {
            const apiGroup = "http://172.19.128.128:3061/api/generals/plantillasms/nocgroups"
            fetch(apiGroup,{cache:"no-store"})
                .then( res => res.json())
                .then( data => setGroupList(data.data))
        }
    },[])

    const handleChangeResponsables = (options) => {
        const updatedOptions = options.map(option => {
            const existingOption = responsables.find(o => o.value === option.value);
            return existingOption ? { ...option, additionalText: existingOption.additionalText } : option;
        })
        setRespondables(updatedOptions);
    }

    const ticketSummary = responsables.reduce((a,v)=>{
        if (a) {
            if (v.inc) {
                return `${a}
${v.inc}`
            } else {
                return a
            }
        } else {
            if (v.inc) {
                return `${v.inc}`
            } else {
                return a
            }
        }
    },"")


    const fechaInicioToText = `${fechaInicio?format(fechaInicio, 'dd/MM/yyyy HH:mm'):"--:--"} hrs`
    const fechaFinToText = `${fechaFin?format(fechaFin, 'dd/MM/yyyy HH:mm'):"--:--"} hrs`

    const responsablesToText = responsables.reduce((a,v)=>{
        if (a) {
            return `${a}
\t${v.grupotag.toUpperCase()} ${v.nombre.toUpperCase()} Tel - ${v.telefono.toUpperCase()}${v.inc?` - ${v.inc}`:""}`
        } else {
            return `\t${v.grupotag.toUpperCase()} ${v.nombre.toUpperCase()} Tel - ${v.telefono.toUpperCase()}${v.inc?` - ${v.inc}`:""}`
        }
    },``)

    const handleInputChange = (value, index) => {
        setRespondables(responsables.map((ritem,rindex) => {
            if (rindex ===index) {
                return({
                    ...ritem,
                    inc:value
                })
            } else {
                return({
                    ...ritem
                })
            }
        } ));
      };

    const actulizacionesToText = `${format(actualizaciones[0].hora,'dd/MM/yyyy')}
\t* ${format(actualizaciones[0].hora,'HH:mm')} hrs ${actualizaciones[0].actualizacion}`


///////////////////////////////START SMS

    const sms = `*${titleSMS.toUpperCase()}*

TIPO DE MENSAJE: *${etapa}*
TICKET ASIGNADO:
${ticketSummary}
           
*FALLA:*    
\t${falla}, ${fechaInicioToText}

*IMPACTO (${fechaInicioToText})* 
${impacto}  
         
*ATIENDE:*
${responsablesToText}

*${etapa === "CIERRE"?`SOLUCIONADO (${fechaFinToText})`:"ACTUALIZACIÓN"}:*
${actulizacionesToText}

*HORA DE SOLUCION:* ${fechaFinToText}`

///////////////////////////////END SMS
    const smsCorreo =  sms.replace(/\t/g,'      ')
    const to = ""
    const cc = ""
    const subject = ""
    const href = `mailto:${to?to:""}?cc=${cc?cc:""}&subject=${subject?subject:""}&body=${sms?encodeURIComponent(smsCorreo):""}`

    const onKeyDownImpacto = (e) => {
        // console.log("onKeyDownImpacto")
        // console.log(e.target.selectionStart)
        if (e.key === 'Tab') {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
    
            setImpacto(impacto.substring(0, start) + '\t' + impacto.substring(end))
      
            setTimeout(() => {
              e.target.selectionStart = e.target.selectionEnd = start + 1
            }, 0)
        }
    }

    return(
        <div >
            {
                soporteList
                ?
                <div className="grid grid-cols-2 m-2 rounded-md bg-gray-200 p-2 text-[14px]">
                    <div className="p-2">

                        <div>
                            
                        </div>
                        <div>
                            <div className="pb-2">
                                <div className="flex">
                                    <div className="text-gray-500 pr-2 w-[130px]">
                                        Tipo de Mensaje:
                                    </div>
                                    <select value={etapa} onChange={(e)=>setEtapa(e.target.value)}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        {
                                            dataEtapa.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.tag}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </div>
                            </div>
                            {/* <div className="pb-2">
                                <div className="text-gray-500 pr-2">
                                    <div>
                                        Ticket:
                                    </div>
                                    <textarea type="text" value={ticket} onChange={(e)=>setTicket(e.target.value)}  spellCheck="false" className="w-full h-[40px]"/>
                                </div>
                            </div> */}
                            <div className="text-gray-500 pr-2 pb-2">
                                <div className="w-full">
                                    <div>
                                        Falla:
                                    </div>
                                    <textarea type="text" value={falla} onChange={(e)=>setFalla(e.target.value)} spellCheck="false" className="w-full p-2" />
                                </div>
                            </div>
                            <div className="pb-2">
                                <div className="flex ">
                                    <div className="text-gray-500 pr-2 flex items-center w-[130px]">
                                        Hora de inicio: 
                                    </div>
                                    <div className="">
                                        <div className="">
                                            <DatePicker
                                                selected={fechaInicio}
                                                onChange={(e)=>setFechaInicio(e)}
                                                showTimeSelect
                                                timeIntervals={1}
                                                timeCaption="Hora"
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="pb-2">
                                <div className="w-full">
                                    <div className="text-gray-500 pr-2">
                                        Impacto:
                                    </div>
                                    <textarea type="text" value={impacto} onChange={(e)=>setImpacto(e.target.value)} onKeyDown={onKeyDownImpacto} spellCheck="false" className="w-full h-[100px] p-2" />
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="w-full">
                                    <div className="text-gray-500 pr-2">
                                        Atiende:
                                    </div>
                                    <div>
                                        <div className="">
                                            <CreatableSelect
                                                isMulti
                                                value={responsables}
                                                onChange={handleChangeResponsables}
                                                options={soporteList}
                                                placeholder="Selecciona o crea una opción"
                                                className="w-full"
                                            />
                                            <div className="border-t-[1px] border-white">
                                                {
                                                    responsables && responsables.map((option, index) => (
                                                        <div key={option.value} className="grid grid-cols-2 p-[2px] border-[1px] border-t-[0px] border-white">
                                                            <div className="pl-2 flex items-center">
                                                                {
                                                                    option.label
                                                                }
                                                            </div>
                                                            <div className="flex">
                                                                <div className="pr-2 flex items-center">
                                                                    Incidencia:
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    placeholder="Agregar texto" 
                                                                    value={option.inc || ''} 
                                                                    onChange={(e) => handleInputChange(e.target.value, index)} 
                                                                    className="w-full p-[4px] pl-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="w-full flex">
                                    <div className="text-gray-500 pr-2 flex items-center w-[130px]">
                                        Hora de solución: 
                                    </div>
                                    <div className="">
                                        <div className="">
                                            <DatePicker
                                            selected={fechaFin}
                                            onChange={(e)=>setFechaFin(e)}
                                            showTimeSelect
                                            timeIntervals={1}
                                            timeCaption="Hora"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="pb-2">
                                <div className="w-full">
                                    <div className="text-gray-500 pr-2 flex items-center w-[130px]">
                                        Actualizaciones: 
                                    </div>
                                    <div className="">
                                        {
                                            actualizaciones.map( item =>
                                                <div className="grid grid-cols-[1fr_4fr]  h-[44px]">
                                                    <div className="h-full">
                                                        <DatePicker
                                                            selected={item.hora}
                                                            onChange={(e)=>setActualizaciones(actualizaciones.map(itemAct => {
                                                                return({
                                                                    ...itemAct,
                                                                    hora: e
                                                                })
                                                            } ))}
                                                            showTimeSelect
                                                            timeIntervals={1}
                                                            timeCaption="Hora"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            className="w-full h-[44px] pl-2 border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <textarea 
                                                            type="text" 
                                                            value={item.actualizacion} 
                                                            className="w-full px-2 border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300" 
                                                            spellCheck={false}
                                                            onChange={(e)=>setActualizaciones(actualizaciones.map(itemAct => {
                                                                return({
                                                                    ...itemAct,
                                                                    actualizacion: e.target.value
                                                                })
                                                            } ))}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full p-2 ">
                        <div className="w-full h-full">
                            <textarea value={sms} className="w-full h-full p-2" spellCheck="false" />
                        </div>
                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}