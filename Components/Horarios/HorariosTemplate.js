"use client"


import { useEffect, useState } from "react"
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function HorariosTemplate () {

    const [data,setData] = useState("")
    const [users,setUsers] = useState("")
    const [dateSelected,setDateSelected] = useState("")
    const [shiftSelected,setShiftSelected] = useState("")
    const [userOptionSelected,setUserOptionSelected] = useState("")
    const [shiftItemDB,setShiftItemDB] = useState("")
    const [searchText,setSearchText] = useState("")
    const [ableChangeVyR,setAbleChangeVyR] = useState(false)
    const [vacacionesValue,setVacacionesValue] = useState("")
    const [remotoValue,setRemotoValue] = useState("")

    const dataFiltered = data?data.map( item => {
        return ({
            ...item,
            turnos: item.turnos.filter( turnosItem => turnosItem.alias.toUpperCase().includes(searchText.toUpperCase()))
        })
    }):""

    const colorsList = [
        "FFF9C6C9",
        "FFAEDFF7",
        "FFFFF4B2",
        "FFFDE2B4",
        "FFD4E2FC",
        "FFC3E8AC"
    ]

    useEffect(()=>{
        const api = "http://172.19.128.128:3061/api/tl/horario"
        fetch(api,{cache:"no-store"})
            .then( res => res.json())
            .then( dataRes => setData(dataRes.data))
    },[])

    useEffect(()=>{
        const api = "http://172.19.128.128:3061/api/tl/usuarioshorarionss"
        fetch(api,{cache:"no-store"})
            .then( res => res.json())
            .then( dataRes => setUsers(dataRes.data))
    },[])
    

    console.log("dateSelected")
    console.log(dateSelected)
    console.log("userOptionSelected")
    console.log(userOptionSelected)
    console.log("shiftItemDB")
    console.log(shiftItemDB)

    const onClickVoid = (cDate,cShift) => {
        setDateSelected(cDate)
        setShiftSelected(cShift)
    }

    const onClickUserFilled = (cDate,cShift,shiftDB) => {
        setDateSelected(cDate)
        setShiftSelected(cShift)
        setShiftItemDB(shiftDB)
    }
    
    const onClickAddShift = async () => {
        const methodHttp = 'POST'
        console.log("si entro a la solicitud")
        if (dateSelected && shiftSelected && userOptionSelected) {

            try {
                const requestOptions = {
                    method: methodHttp,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        date: dateSelected,
                        shift: shiftSelected,
                        user: userOptionSelected,
                        remoto: false

                    })
                }
                const api = "http://172.19.128.128:3061/api/tl/sethorarios/adduser"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
    
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                //setStateDb(statesMessages.failed)
            }
        } else {

        }
    }

    const onClickRemoveShift = async () => {
        const methodHttp = 'DELETE'
        console.log("si entro a la solicitud de borrado")
        if (shiftItemDB) {

            try {
                const requestOptions = {
                    method: methodHttp,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        shift: shiftItemDB.id
                    })
                }
                const api = "http://172.19.128.128:3061/api/tl/sethorarios/removeuser"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
    
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                //setStateDb(statesMessages.failed)
            }
        } else {
            console.log("Turno no seleccionado!!!")
        }
    }

    const toCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const exportToExcel = async (summaryShifts) => {

        console.log("data fecha")
        console.log(data)

        const startDate = toCapital(format(new Date(data[0].fecha), "EEEE dd/MM/yyyy", { locale: es }))
        const endDate = toCapital(format(new Date(data[data.length-1].fecha), "EEEE dd/MM/yyyy", { locale: es }))
        const month = toCapital(format(data[Math.trunc((data.length-1)/2)].fecha, 'MMMM', { locale: es }))
        const year = toCapital(format(data[Math.trunc((data.length-1)/2)].fecha, 'yyyy', { locale: es }))

        const titleStartDate = toCapital(format(new Date(data[0].fecha), "dd-MM-yyyy", { locale: es }))
        const titleEndDate = toCapital(format(new Date(data[data.length-1].fecha), "dd-MM-yyyy", { locale: es }))

        const weeksExtracted = data.reduce((a,v) => {
            if (a.includes(v.semana)) {
                return a
            } else {
                return [...a,v.semana]
            }
        },[])

        const weekList = weeksExtracted.map( (week,index) => {
            return ({
                semana: week,
                color: colorsList[index]
            })
        })
        
        console.log(startDate)
        console.log(endDate)
        console.log(month)
        console.log(weekList)

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Horarios');

        // Agregar título con formato
        const titleRow = worksheet.addRow(['HORARIOS PERSONAL TURNOS ROTATIVOS - CARGA MANUAL']);
        titleRow.font = { bold: true };
        // titleRow.fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: 'FFFF0000' } // Fondo rojo
        // };

        // Agregar columnas personalizadas
        //worksheet.addRow([]);
        const customRow = worksheet.addRow(['MES', `${month}* ${year}`]);
        customRow.getCell(1).font = { bold: true }; // Negritas para "MES"

        worksheet.addRow(['',`${startDate} - ${endDate}`]);

    
        worksheet.addRow([]);
        worksheet.addRow(['PERNR', 'CHOIC', 'BEGDA', 'ENDDA', 'BEGUZ', 'ENDUZ', 'TPROG', 'PAMOD', 'Tipo de trabajo', 'Analista', 'LACTANCIA']).eachCell(cell => {
            cell.font = { bold: true };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        summaryShifts.forEach(item => {
            const row = worksheet.addRow([item.PERNR,item.CHOIC,item.BEGDA,item.ENDDA,item.BEGUZ,item.ENDUZ,item.TPROG,item.PAMOD,item.Tipodetrabajo,item.Analista,item.LACTANCIA]);
            
            const searchWeek = weekList.find( weekItem => weekItem.semana === item.semana )
            const fillColor = searchWeek?searchWeek.color:""
            
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                if (fillColor) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: fillColor }
                    };
                }
            })
        })

        worksheet.columns.forEach((column, index) => {
            if (index >= 2) { 
                let maxLength = 0;
                column.eachCell({ includeEmpty: true }, cell => {
                    const columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : maxLength;
            }
        });


        const worksheetAnalistas = workbook.addWorksheet('Analistas');

        // Agregar título con formato en la celda B1
        const titleRowAnalistas = worksheetAnalistas.getCell('B1');
        titleRowAnalistas.value = 'ANALISTAS';
        titleRowAnalistas.font = { bold: true, underline: true };

        // Agregar la lista de analistas desde la celda B2
        const analistas = ['Analista 1', 'Analista 2', 'Analista 3']; // Reemplaza con tu lista de analistas
        users.forEach((analista, index) => {
            const cell = worksheetAnalistas.getCell(`B${index + 2}`);
            cell.value = analista.nombre;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Horarios_NOC_de_RED_${titleStartDate}_${titleEndDate}v01.xlsx`);
        console.log("Data downloaded")
    };
        
   
    const generateSummary = () => {

        
        const userData = users.find( item => item.id === "C18161")
  
        const summaryShifts = []
        let auxShift
        console.log("Summary")
        console.log(users)
        console.log(data)
        users.map( userItem => {
            for ( let i = 0; i < data.length; i++) {
                auxShift = data[i].turnos.filter( item => item.colaborador === userItem.id)
    
                summaryShifts.push({
                    semana: data[i].semana,
                    PERNR: userItem.sap,
                    CHOIC: "2003",
                    BEGDA: format(new Date(data[i].fecha), 'dd.MM.yyyy'),
                    ENDDA: format(new Date(data[i].fecha), 'dd.MM.yyyy'),
                    BEGUZ: "",
                    ENDUZ: "",
                    TPROG: auxShift.length?auxShift[0].code:"DESC",
                    PAMOD: "",
                    Tipodetrabajo: auxShift.length?(auxShift[0].remoto?"Remoto":"Presencial"):"Presencial",
                    Analista:userItem.nombre,
                    LACTANCIA: auxShift.length?(auxShift[0].colaborador === "C18246"?(auxShift[0].turno === 3?"7 - 8 am":"3 - 4 pm"):""):""
    
                })
            }
        })
        //exportToCSV(summaryShifts, "Horario.csv")
        exportToExcel(summaryShifts)
        console.log("summaryShifts")
        console.log(summaryShifts)
    }
    const userColor = {
        uno: "#F48A8E",
        dos: "#7ECDF2",
        tres: "#FFEB66",
        cuatro: "#FDC48A",
        cinco: "#A8C4F9",
        seis: "#A0D97A",
        siete: "#D1D1F5",
        ocho: "#FF8BA1",
        nueve: "#FFC48A",
        diez: "#B3FFFF",
        once: "#E6C07A",
        doce: "#C49BC4"
    } 

    const ableModifySection = () => {
        if (shiftItemDB) {
            setAbleChangeVyR(true)
            setVacacionesValue(shiftItemDB.vacaciones)
            setRemotoValue(shiftItemDB.remoto)
        }
    }

    const modifyPersonShift = async () => {
        const methodHttp = 'POST'
        console.log("si entro a la solicitud de borrado")
        if (shiftItemDB && ableChangeVyR) {

            try {
                const requestOptions = {
                    method: methodHttp,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        shift: shiftItemDB.id,
                        remoto: remotoValue,
                        vacaciones: vacacionesValue
                    })
                }
                const api = "http://172.19.128.128:3061/api/tl/sethorarios/modifyuser"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
    
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                //setStateDb(statesMessages.failed)
            }
        } else {
            console.log("Turno no seleccionado!!!")
        }

        setAbleChangeVyR(false)
    }

    return (
        <div className="grid grid-cols-[1fr_7fr]">
            <div>
                <div>
                    <div>
                        <div>
                            Analista: 
                        </div>
                        <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                    </div>
                    <div>
                        <div style={{ backgroundColor: userColor.uno }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.dos }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.tres }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.cuatro }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.cinco }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.seis }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.siete }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.ocho }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.nueve }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.diez }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.once }} className={`h-[20px] w-[20px] `}></div>
                        <div style={{ backgroundColor: userColor.doce }} className={`h-[20px] w-[20px] `}></div>
                    </div>
                </div>
            </div>
            <div>
                <div>

                    {
                        data
                        ?
                        <div className="grid grid-cols-7">
                            
                            {
                                dataFiltered.map( item =>
                                    <div className="" key={Math.random().toString(36).slice(2, 11)}>
                                        <div className="bg-[#4682B4] text-white pl-2 pt-2 text-[13px]">
                                            {
                                                (new Date(item.fecha)).toLocaleDateString('es-ES',{weekday: "long"}).toUpperCase()
                                            }
                                        </div>
                                        <div className="bg-[#4682B4] text-white pl-2 pb-2 text-[13px]">
                                            {
                                                (new Date(item.fecha)).toLocaleDateString('es-ES')
                                            }
                                        </div>
                                        <div>
                                            
                                                <div>
                                                    <div className="bg-[#ADD8E6] bg-opacity-50 h-[35px] pl-2 flex items-center">
                                                        {
                                                            item.turnos.filter( p => p.turno === 4).length
                                                            ?
                                                            <div className="flex">
                                                                {
                                                                    item.turnos.filter( p => p.turno === 4).map( pf => 
                                                                        <div 
                                                                            onClick={()=>onClickUserFilled(item,4,pf)} 
                                                                            key={Math.random().toString(36).slice(2, 11)}
                                                                            style={{ 
                                                                                backgroundColor: dateSelected.id === item.id && shiftSelected === 4 && shiftItemDB.alias === pf.alias ? "yellow" : (pf.vacaciones?"white":pf.color) ,
                                                                                color: dateSelected.id === item.id && shiftSelected === 4 && shiftItemDB.alias === pf.alias ?"green":(pf.vacaciones?"#b1b1b1":(pf.remoto?"gray":"blue")),
                                                                                textDecoration: pf.vacaciones?"line-through":(pf.remoto?"overline":"none")
                                                                            }}
                                                                            className={`h-[25px] w-[25px] flex justify-center items-center font-bold text-[13px]`}
                                                                        >
                                                                            {
                                                                                pf.alias
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            <div 
                                                                className={` pl-2 pr-2 flex items-center justify-center ${dateSelected.id === item.id && shiftSelected === 4 ? "bg-[#ffff00] text-white" : "text-orange-100"}`}
                                                                onClick={()=>onClickVoid(item,4)}
                                                            >
                                                                Oficina
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="bg-[#E0FFFF] bg-opacity-50 h-[35px] pl-2 flex items-center">
                                                        {
                                                            item.turnos.filter( p => p.turno === 1).length
                                                            ?
                                                            <div className="flex">
                                                                {
                                                                    item.turnos.filter( p => p.turno === 1).map( pf => 
                                                                        <div 
                                                                            onClick={()=>onClickUserFilled(item,1,pf)} 
                                                                            key={Math.random().toString(36).slice(2, 11)}
                                                                            style={{ 
                                                                                backgroundColor: dateSelected.id === item.id && shiftSelected === 1 && shiftItemDB.alias === pf.alias ? "yellow" : (pf.vacaciones?"white":pf.color) ,
                                                                                color: dateSelected.id === item.id && shiftSelected === 1 && shiftItemDB.alias === pf.alias ?"green":(pf.vacaciones?"#b1b1b1":(pf.remoto?"gray":"blue")),
                                                                                textDecoration: pf.vacaciones?"line-through":(pf.remoto?"overline":"none")
                                                                            }}
                                                                            className={`h-[25px] w-[25px] flex justify-center items-center font-bold text-[13px]`}
                                                                        >
                                                                            {
                                                                                pf.alias
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            <div 
                                                                className={`text-orange-100 h-[25px] w-[25px] flex items-center justify-center ${dateSelected.id === item.id && shiftSelected === 1 ? "bg-[#ffff00] text-white" : "text-orange-100"}`}
                                                                onClick={()=>onClickVoid(item,1)}
                                                            >
                                                                T1
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="bg-[#FFFF99] bg-opacity-50 h-[35px] pl-2 flex items-center">
                                                        {
                                                            item.turnos.filter( p => p.turno === 2).length
                                                            ?
                                                            <div className="flex">
                                                                {
                                                                    item.turnos.filter( p => p.turno === 2).map( pf => 
                                                                        <div 
                                                                            onClick={()=>onClickUserFilled(item,2,pf)} 
                                                                            key={Math.random().toString(36).slice(2, 11)}
                                                                            style={{ 
                                                                                backgroundColor: dateSelected.id === item.id && shiftSelected === 2 && shiftItemDB.alias === pf.alias ? "yellow" : (pf.vacaciones?"white":pf.color) ,
                                                                                color: dateSelected.id === item.id && shiftSelected === 2 && shiftItemDB.alias === pf.alias ?"green":(pf.vacaciones?"#b1b1b1":(pf.remoto?"gray":"blue")),
                                                                                textDecoration: pf.vacaciones?"line-through":(pf.remoto?"overline":"none")
                                                                            }}
                                                                            className={`h-[25px] w-[25px] flex justify-center items-center font-bold text-[13px]`}
                                                                        >
                                                                            {
                                                                                pf.alias
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            <div
                                                                className={`text-orange-100 h-[25px] w-[25px] flex items-center justify-center ${dateSelected.id === item.id && shiftSelected === 2 ? "bg-[#ffff00] text-white" : "text-orange-100"}`} 
                                                                onClick={()=>onClickVoid(item,2)}
                                                            >
                                                                T2
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="bg-[#FFCC99] bg-opacity-50 h-[35px] pl-2 flex items-center">
                                                        {
                                                            item.turnos.filter( p => p.turno === 3).length
                                                            ?
                                                            <div className="flex">
                                                                {
                                                                    item.turnos.filter( p => p.turno === 3).map( pf => 
                                                                        <div 
                                                                            onClick={()=>onClickUserFilled(item,3,pf)} 
                                                                            key={Math.random().toString(36).slice(2, 11)}
                                                                            style={{ 
                                                                                backgroundColor: dateSelected.id === item.id && shiftSelected === 3 && shiftItemDB.alias === pf.alias ? "yellow" : (pf.vacaciones?"white":pf.color) ,
                                                                                color: dateSelected.id === item.id && shiftSelected === 3 && shiftItemDB.alias === pf.alias ?"green":(pf.vacaciones?"#b1b1b1":(pf.remoto?"gray":"blue")),
                                                                                textDecoration: pf.vacaciones?"line-through":(pf.remoto?"overline":"none")
                                                                            }}
                                                                            className={`h-[25px] w-[25px] flex justify-center items-center font-bold text-[13px]`}
                                                                        >
                                                                            {
                                                                                pf.alias
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            <div
                                                                className={`text-orange-100 h-[25px] w-[25px] flex items-center justify-center ${dateSelected.id === item.id && shiftSelected === 3 ? "bg-[#ffff00] text-white" : "text-orange-100"}`} 
                                                                onClick={()=>onClickVoid(item,3)}
                                                            >
                                                                T3
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        "Cargando..."
                    }

                    
                </div>
                <div className="grid grid-cols-2">
                    <div className="p-2">
                        <div>
                            {
                                users
                                ?
                                users.map( item => 
                                    <div 
                                        onClick={()=>setUserOptionSelected(item)} 
                                        key={Math.random().toString(36).slice(2, 11)}
                                        className={`${userOptionSelected.id === item.id ? "bg-yellow-400 text-white": ""}`}
                                    >
                                        {
                                            `${item.alias} ${item.id} ${item.nombre}`
                                        }
                                    </div>
                                )
                                :
                                "Cargando..."
                            }
                        </div>
                    </div>
                    <div className="p-2 grid grid-cols-2">
                        <div>
                            {
                                data && users
                                ?
                                <div>
                                    <div onClick={()=>onClickAddShift()}>
                                        Agregar turno
                                    </div>
                                    
                                    <div onClick={()=>generateSummary()}>
                                        Exportar XLS RRHH
                                    </div>

                                    <div onClick={()=>onClickRemoveShift()}>
                                        Eliminar turno
                                    </div>

                                </div>
                                :
                                "Cargando..."
                            }
                        </div>
                        <div>
                            <div onClick={()=>ableModifySection()} >
                                Modificar
                            </div>
                            <div>
                                {
                                    shiftItemDB && ableChangeVyR
                                    ?
                                    <div>
                                        <div 
                                            onClick={()=>setVacacionesValue( ant => !ant)}
                                            className={`border-[1px] border-yellow-400 p-2 ${vacacionesValue?"bg-yellow-400 text-white":""}`}
                                        >
                                            Vacaciones
                                        </div>
                                        <div
                                            onClick={()=>setRemotoValue( ant => !ant)}
                                            className={`border-[1px] border-yellow-400 p-2 ${remotoValue?"bg-yellow-400 text-white":""}`}
                                        >
                                            Remoto
                                        </div>
                                        <div className="p-2 border-[1px] border-yellow-400" onClick={()=>modifyPersonShift()}>
                                            Guardar
                                        </div>
                                    </div>
                                    :
                                    ""
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}