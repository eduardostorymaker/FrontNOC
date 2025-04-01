"use client"

import { useState } from "react"

export default function ScriptAutinComponent () {
    const [gestoresList,setGestoresList] = useState("")
    const [equiposList,setEquiposList] = useState("")
    const [alarmasList,setAlarmasList] = useState("")
    const linesToArray = (lines) => lines.split(/\r?\n/);
    

    const addTextFormatLike = (arrayInput,type,comparition) => arrayInput.filter(item => item).map(item => {
        return `"${type}" ${comparition} "${item}"`    
    })

    const arraytoText = (arrayInput,condition) =>  arrayInput.filter(item => item).join(` ${condition} `)

    const dataFromGestores = gestoresList?`(${arraytoText(addTextFormatLike(linesToArray(gestoresList),"agent","like"),"or")})`:""
    const dataFromEquipos = equiposList?`and (${arraytoText(addTextFormatLike(linesToArray(equiposList),"node","like"),"or")})`:""
    const dataFromAlarmas = alarmasList?`and (${arraytoText(addTextFormatLike(linesToArray(alarmasList),"alarmid","="),"or")})`:""

    const textToScript = `
    ${dataFromGestores} ${dataFromEquipos} ${dataFromAlarmas} 
    `
    return (
        <div className="w-full h-full grid grid-cols-2">
            <div className="h-full w-full p-2">
                <div>
                    <div>
                        gestores
                    </div>
                    <textarea className="w-full h-[200px] border-[1px] border-red-400"  value={gestoresList} onChange={(e)=>setGestoresList(e.target.value)} />
                </div>
                <div>
                    <div>
                        equipos
                    </div>
                    <textarea className="w-full h-[200px] border-[1px] border-red-400" value={equiposList} onChange={(e)=>setEquiposList(e.target.value)} />
                </div>
                <div>
                    <div>
                        alarmas
                    </div>
                    <textarea className="w-full h-[200px] border-[1px] border-red-400" value={alarmasList} onChange={(e)=>setAlarmasList(e.target.value)} />
                </div>
            </div>
            <div className="h-full w-full p-2">
                <textarea className="w-full h-full border-[1px] border-red-400" value={textToScript} spellCheck={false} />
            </div>
        </div>
    )
}