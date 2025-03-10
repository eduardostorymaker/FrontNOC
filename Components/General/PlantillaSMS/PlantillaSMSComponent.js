"use client"

import { useState } from "react"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { add } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

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

const oymsurList = [
    {
        value:"Alexander Cueto Nieves",
        label:"Alexander Cueto Nieves",
        telefono:"997109086"
    },
    {
        value:"Amilcar Luna Gutierrez",
        label:"Amilcar Luna Gutierrez",
        telefono:"951750103"
    },
    {
        value:"Brishov Valdivia Huamantico",
        label:"Brishov Valdivia Huamantico",
        telefono:"997109167"
    },
    {
        value:"Diego Marcapura",
        label:"Diego Marcapura",
        telefono:"997109260"
    },
    {
        value:"Esteban Vilcahuaman Masca",
        label:"Esteban Vilcahuaman Masca",
        telefono:"941700135"
    },
    {
        value:"Fredick Sanchez Tenicela",
        label:"Fredick Sanchez Tenicela",
        telefono:"984730109"
    },
    {
        value:"Guillermo Montaño Delgado",
        label:"Guillermo Montaño Delgado",
        telefono:"983700100"
    },
    {
        value:"Humberto Hualpa Quispe",
        label:"Humberto Hualpa Quispe",
        telefono:"953500104"
    },
    {
        value:"Jesus Arestegui Flores",
        label:"Jesus Arestegui Flores",
        telefono:"941700106"
    },
    {
        value:"Jorge Vega Copaja",
        label:"Jorge Vega Copaja",
        telefono:"952380101"
    },
    {
        value:"Luis Efio Sosa",
        label:"Luis Efio Sosa",
        telefono:"997629482"
    },
    {
        value:"Manuel Diaz Lopez",
        label:"Manuel Diaz Lopez",
        telefono:"997109114"
    },
    {
        value:"Marlon Coaquira Ari",
        label:"Marlon Coaquira Ari",
        telefono:"943530139"
    },
    {
        value:"Pedro Velarde",
        label:"Pedro Velarde",
        telefono:"943530154"
    },
    {
        value:"Rene Sutta",
        label:"Rene Sutta",
        telefono:"997106876"
    },
    {
        value:"Ricardo Escobedo",
        label:"Ricardo Escobedo",
        telefono:"997108567"
    },
    {
        value:"Ronald Llanque",
        label:"Ronald Llanque",
        telefono:"997101013"
    },
    {
        value:"Rosmel Cayllahue",
        label:"Rosmel Cayllahue",
        telefono:"997101970"
    },
    {
        value:"Roy Sanchez Delgado",
        label:"Roy Sanchez Delgado",
        telefono:"997109053"
    }

]

const soporteList = [
    ...oymsurList.map(item => ({...item, group:"OyM SUR", inc:""}))
]

export default function PlantillaSMSComponent ({params}) {

    console.log("params")
    console.log(params)

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [etapa, setEtapa] = useState(dataEtapa[0].tag)
    const [ticket,setTicket] = useState('')
    const [falla,setFalla] = useState('')
    const [fechaInicio,setFechaInicio] = useState(new Date())
    const [fechaFin,setFechaFin] = useState(add(new Date(), { hours: 3 }))
    const [impacto,setImpacto] = useState('*SIN AFECTACIÓN DE SERVICIOS*')
    const [responsables,setRespondables] = useState([])
    const [actualizaciones,setActualizaciones] = useState([{hora:new Date(), actualizacion: ""}])

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
    ${v.group.toUpperCase()} ${v.label.toUpperCase()} Tel - ${v.telefono.toUpperCase()}${v.inc?` - ${v.inc}`:""}`
        } else {
            return `    ${v.group.toUpperCase()} ${v.label.toUpperCase()} Tel - ${v.telefono.toUpperCase()}${v.inc?` - ${v.inc}`:""}`
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
    *${format(actualizaciones[0].hora,'HH:mm')} hrs ${actualizaciones[0].actualizacion}`

    const sms = `*${params.noc.replaceAll("_"," ").toUpperCase()}*

TIPO DE MENSAJE: ${etapa}
TICKET ASIGNADO:
${ticketSummary}
           
*FALLA:*    
    ${falla}, ${fechaInicioToText}

*IMPACTO (${fechaInicioToText})* 
    ${impacto}  
         
*ATIENDE:*
${responsablesToText}

*${etapa === "CIERRE"?`SOLUCIONADO (${fechaFinToText})`:"ACTUALIZACIÓN"}:*
${actulizacionesToText}

*HORA DE SOLUCION:* ${fechaFinToText}
    
    `
    const options = [
        { value: 'option1', label: 'Opción 1' },
        { value: 'option2', label: 'Opción 2' },
        { value: 'option3', label: 'Opción 3' },
      ];
      


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

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
            <div className="w-full h-full p-2">
                <div className="w-full h-full">
                    <textarea value={sms} className="w-full h-full p-2" spellCheck="false" />
                </div>
            </div>
        </div>
    )
}