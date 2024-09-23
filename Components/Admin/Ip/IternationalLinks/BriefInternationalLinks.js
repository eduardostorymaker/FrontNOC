"use client"

import { LinkSharp } from "@mui/icons-material"
import { useState, useEffect } from "react"


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";

const filterKind = [
    {
        filter:"trunk",
        tag: "trunk",
    },
    {
        filter:"GigabitEthernet",
        tag: "10",
    },
    {
        filter:"50",
        tag: "50",
    },
    {
        filter:"100",
        tag: "100",
    }
]
const capacities = [
    {
        id:"50|100",
        filter:"50",
        count: 0,
        afected: 0,
        date: new Date(0)
    },
    {
        id:"100",
        filter:"100",
        count: 0,
        afected: 0,
        date: new Date(0)
    },
    {
        id:"10",
        filter:"10",
        count: 0,
        afected: 0,
        date: new Date(0)
    },
    {
        id:"TRUNK",
        filter:"TRUNK",
        count: 0,
        afected: 0,
        date: new Date(0)
    },
    {
        id:"OTRO",
        filter:"",
        count: 0,
        afected: 0,
        date: new Date(0)
    }
]
const serviceType = [
    {
        id: "AMAZON",
        filter:"amazon",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "GOOGLE",
        filter:"google",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "ARELION",
        filter:"arelion",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "VERIZON",
        filter:"veriz",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "EDGEUNO",
        filter:"edgeuno",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "GTT",
        filter:"gtt",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "NTT",
        filter:"ntt",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "FASTLY",
        filter:"fastly",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "COGENT",
        filter:"cogent",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "MICROSOFT",
        filter:"microsoft",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "NETFLIX",
        filter:"netflix",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "TATA",
        filter:"tata",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "TWITCH",
        filter:"twitch",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "FACEBOOK",
        filter:"facebook",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "VALVE",
        filter:"valve",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "RIOT",
        filter:"riot",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "GTD",
        filter:"gtd",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "PORTA",
        filter:"porta",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "CIRION",
        filter:"cirion",
        count: 0,
        afected:false,
        capacities
    },
    {
        id: "TELXIUS",
        filter:"telxius",
        count: 0,
        afected:false,
        capacities
    },
    // {
    //     id: "NAP",
    //     filter:"nap",
    //     count: 0,
    //     afected:false,
    //     capacities
    // },
    {
        id: "OTRO",
        filter:"",
        count: 0,
        afected:false,
        capacities
    }
]

const filterTableFirst = {
    serviceName: {
        state: false,
        value: ""
    },
    capacityName: {
        state: false,
        value: ""
    },
    intxAfected: {
        state: false
    }
} 

export default function BriefInternationalLinks () {

    const [internarionalLinks,setInternationalLinks] = useState([])
    const [search,setSearch] = useState("")
    const [filterTable,setFilterTable] = useState(filterTableFirst)
    const [trunkFilter,setTrunkFilter] = useState("without")
    const [alarmList, setAlarmList] = useState("")
    const [showSummary, setShowSummary] = useState(true)
    const [showAlarmsSection,setShowAlarmsSection] = useState(false)
    const [showInterconexions, setShowInterconexions] = useState(true)

    useEffect(()=>{
        console.log("Consultando API")
        const urlLinks = "http://172.19.128.128:3060/api/ip/international/links"
        fetch(urlLinks)
            .then( res => res.json())
            .then( data => setInternationalLinks(data.data))
    },[])


    /////////////////////////////////////////////////////////////////////////////////
    ///////// Processing Alarm List
    const lines = alarmList.trim().split('\n')
    const linesFiltered = lines.filter( line => line.toLowerCase().includes("link down"|"LAG"))

    const regexTime = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g
    const regexInterface =  /Name=([^\s\t]+)/
    const regexDevice = /rMPLS\w+/g;
    
    const onlyAlarmsInterfacesWithDownAndLag = linesFiltered.map( line => {
        return ({
            alarm: line.toLowerCase().includes("link down")?"down":"lag",
            source: line.match(regexDevice)?line.match(regexDevice)[0]:"",
            interface: line.match(regexInterface)?line.match(regexInterface)[1]:"",
            date:line.match(regexTime).map(time => new Date(time)).reduce((a,v) => { return a===0?v:(a<v?a:v) },0),
            kind:filterKind.find( item => line.match(regexInterface)[1].toLowerCase().includes(item.filter.toLowerCase()))?filterKind.find( item => line.match(regexInterface)[1].toLowerCase().includes(item.filter.toLowerCase())).tag:""

        })
    })
    const summarizedAlarmInterfacesWithoutRepeats = onlyAlarmsInterfacesWithDownAndLag.reduce((a,v) => {
        const auxArray = []
        if (a.length) {
            let newItem = true
            for (let item of a) {
                if ( item.source === v.source && item.interface === v.interface) {
                    if(v.alarm === "down" && item.alarm !== "down") {
                        auxArray.push(v)
                    } else if (v.alarm !== "down" && item.alarm === "down") {
                        auxArray.push(item)
                    } else {
                        if (item.date > v.date) {
                            auxArray.push(item)
                        } else {
                            auxArray.push(v)
                        }
                    } 
                    newItem = false
                } else {
                    auxArray.push(item)
                }
            }
            if (newItem) {
                auxArray.push(v)
            }

        } else {
            auxArray.push(v)
        }
        return(auxArray)
    },[])

    //const summarizedAlarmInterfacesWithoutTrunks = summarizedAlarmInterfacesWithoutRepeats.filter(item => !item.interface.toLowerCase().includes("trunk"))

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ///////// Filtering trunks
    const internationaLinksOnly = internarionalLinks.filter( item => item.category === "internacional")
    const internarionalLinksWithTrunksFilter = internationaLinksOnly.filter( item => {
        if (trunkFilter === "without") {
            return (item.kind.toLowerCase() !== "trunk")
        } else if (trunkFilter === "only") {
            return (item.kind.toLowerCase() === "trunk")
        } else {
            return (true)
        }
    })


    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ///////// Processing data from database

    const internationalLinkAddedAfectedAndDateOnFirstLevel = internarionalLinksWithTrunksFilter.map( link => {
        for (let afectedLink of summarizedAlarmInterfacesWithoutRepeats) {
            const regex = /eth-trunk(\d+)/
            const linkTrunk = link.trunk.replaceAll(" ","").toLowerCase().match(regex)?link.trunk.replaceAll(" ","").toLowerCase().match(regex)[1]:"notrunklink"
            const afectedTrunk = afectedLink.interface.replaceAll(" ","").toLowerCase().replace().match(regex)?afectedLink.interface.replaceAll(" ","").toLowerCase().match(regex)[1]:"noafectedtrunk"
            if (afectedLink.source === link.source && link.interface.toLowerCase().includes(afectedLink.interface.toLowerCase())) {
                return ({
                    ...link,
                    afected: true,
                    date: afectedLink.date
                })
            } else if (link.trunk && afectedLink.source === link.source && linkTrunk === afectedTrunk) {
                return ({
                    ...link,
                    afected: true,
                    date: afectedLink.date
                })
            }
        }
        return ({
            ...link,
            afected: false,
            date: new Date(0)
        })
    })

    const internationalLinksOnlyAfected = internationalLinkAddedAfectedAndDateOnFirstLevel.filter(item => item.afected)

    console.log("internationalLinksOnlyAfected")
    console.log(internationalLinksOnlyAfected)

 


    const summaryAndAddLinksServicesAndCapacities = (links) => {

        const countTypeOfCapacityAndAfected = (type, link) => {
            for (let capacity of type.capacities) {
                if (link.kind.toLowerCase().includes(capacity.filter.toLowerCase())) {
                    return(
                        type.capacities.map( item => {
                            
                            if (item.filter === capacity.filter) {
                                if (link.afected) {
                                    return({
                                        ...item,
                                        count: item.count + 1,
                                        afected: item.afected + 1,
                                        date: link.date
                                    })
                                } else {
                                    return({
                                        ...item,
                                        count: item.count + 1
                                    })

                                }
                            } else {
                                return {
                                    ...item
                                }
                            }
                        })
                    )
                } 
                
            }
        }

        const modifyLinks = (links,serviceType) => {
            let summarizedServicesAfectedLevel2 = serviceType
            const linksWithAllData = links.map( link => {
                for (let service of serviceType) {
                    if (link.description.toLowerCase().includes(service.filter.toLowerCase())) {
                        summarizedServicesAfectedLevel2 = summarizedServicesAfectedLevel2.map( type => {
                            if (service.filter === type.filter ) {
                                return {
                                    ...type,
                                    count: link.kind.trim().toLowerCase() !== "trunk"?type.count + 1:type.count,
                                    capacities: countTypeOfCapacityAndAfected(type,link)
                                    }
                            } else {
                                return {
                                    ...type
                                }   
                            }
                        })

                        return ({
                                ...link,
                                service: service.id
                            })
                    }
                }
                return ({
                        ...link,
                        service: "unknow"
                    })
            })
            return {
                linksWithAllData,
                summarizedServicesAfectedLevel2
            }
        
        }

        return modifyLinks(links,serviceType)
    }

    // console.log("agregando resumen servicios:")
    // console.log(summaryAndAddLinksServicesAndCapacities(internarionalLinks))

    const {
        linksWithAllData,
        summarizedServicesAfectedLevel2
    } = summaryAndAddLinksServicesAndCapacities(internationalLinkAddedAfectedAndDateOnFirstLevel)

    console.log("linksWithAllData")
    console.log(linksWithAllData)

    const linksWithAllDataToShow = linksWithAllData.filter( item => {
        if (filterTable.serviceName.state) {
            return(
                item.service.toLowerCase().includes(filterTable.serviceName.value.toLowerCase())
            )
        } else if (filterTable.capacityName.state) {
            return(
                item.kind.toLowerCase() === filterTable.capacityName.value.toLowerCase()
            )
        } else if (filterTable.intxAfected.state) {
            return(
                item.afected
            )
        } else {
            return true
        }
    })

    //
    const summarizedServices = summarizedServicesAfectedLevel2.map( briefItem => {
        //adding afected on level 1
        for (let capacity of briefItem.capacities) {
            if (capacity.afected) {
                return ({
                    ...briefItem,
                    afected: true
                })
            }
        }
        return ({
            ...briefItem
        })
    })

    console.log("summarizedServices")
    console.log(summarizedServices)

    const summarizedServicesAfectedOnlyFirstLevelAfected = summarizedServices.filter( item => item.afected)
    const summarizedServicesAfectedOnlyAfected = summarizedServicesAfectedOnlyFirstLevelAfected.map( item => {
        return({
            ...item,
            capacities: item.capacities.filter(item => item.afected)
        })
    })
    console.log("summarizedServicesAfectedOnlyAfected")
    console.log(summarizedServicesAfectedOnlyAfected)

    const dateZero = new Date(0)

    const beginingSMSTitleText = "Caída enlaces internacionales "

    const titleSMS = summarizedServicesAfectedOnlyAfected.reduce((a,v) => {
        const categoryText = v.capacities.reduce((ac,vc)=>{
            if (vc.id.trim().toLowerCase() !== "trunk") {
                return {
                    text: ac.text + `${vc.id}G(${vc.afected}/${vc.count}) `,
                    date: ac.date === 0?vc.date:(ac.date > vc.date?vc.date:ac.date)
                }
            } else {
                return ac
            }
        },{
            text: "",
            date: 0
        })
        console.log("v.date")
        console.log(v.date)
        return {
            date: a.date === 0?categoryText.date:(a.date > categoryText.date?categoryText.date:a.date),
            text: a.text + `${v.id} ${categoryText.text.trim()} `
        }
    },{
        date: 0,
        text: beginingSMSTitleText
    })


    console.log("titleSMStext")
    console.log(titleSMS.text.trim())

    const briefAllLinks = (internarionalLinksFiltered) => {
        return internarionalLinksFiltered.reduce((a,v) => {
            return (
                a.map( (item,index) => {
                    return {
                        ...item,
                        count: item.count + v.capacities[index].count,
                        afected: item.afected + v.capacities[index].afected
                    }
                })
            )
            
        },capacities)
    }

    const summarizedCapacityAfected =  briefAllLinks(summarizedServicesAfectedLevel2)
    const summarizedCapacityAfectedOnlyAfected = summarizedCapacityAfected.filter(item => item.afected)
    console.log("summarizedCapacityAfected")
    console.log(summarizedCapacityAfected)
    console.log("filterTable")
    console.log(filterTable)

    const textCapacityAfected = summarizedCapacityAfectedOnlyAfected.reduce((a,v) => {
        if (v.id.trim().toLowerCase() !== "trunk") {
            return a + `${v.id}G (${v.afected}/${v.count}) `
        } else {
            return a
        }
    },"")

    console.log("textCapacityAfected")
    console.log(textCapacityAfected.trim())
    //////////////////////////////////////////
    /////Variables:
    /////linksWithAllData
    /////internationalLinksOnlyAfected
    /////summarizedCapacityAfected
    /////summarizedServices
    /////summarizedCapacityAfected
    console.log("titleSMS.date")
    console.log(titleSMS.date)

    //////////////////////////////////////////////////////////////////////////////////////////
    ///////Styles
    const tableRowStyle = "grid grid-cols-[200px_200px_100px_600px_150px_150px_250px_250px] w-[2000px] border-[1px] border-t-0 border-red-200"
    const tableCellHeaderStyle = "flex px-2 items-center w-full text-white border-r-[1px] border-white justify-center"
    const tableCellBodyStyle = "flex px-2 items-center w-full"

    const sectionDesplegableStyle = "p-2 text-white text-[18px] w-full bg-red-400 border-b-[1px] border-white flex"

    return(
        <div className="h-[calc(100vh-80px)] w-full overflow-scroll">
            
            <div className="w-full">
                {   
                    internarionalLinks
                    ?
                    <div className="w-full">
                        <div>
                            <div>
                                <div>
                                    <div className="flex justify-between">
                                        <div className="grid grid-cols-3 w-[320px] p-2 ">
                                            <div 
                                                onClick={() => setTrunkFilter("without")}
                                                className={`p-2 text-white border-r-[1px] border-white ${trunkFilter === "without"?"bg-yellow-400":"bg-red-400"}`}
                                            >
                                                Sin Trunks
                                            </div>
                                            <div 
                                                onClick={() => setTrunkFilter("with")}
                                                className={`p-2 text-white border-r-[1px] border-white ${trunkFilter === "with"?"bg-yellow-400":"bg-red-400"}`}
                                            >
                                                Con trunk
                                            </div>
                                            <div 
                                                onClick={() => setTrunkFilter("only")}
                                                className={`p-2 text-white border-r-[1px] border-white ${trunkFilter === "only"?"bg-yellow-400":"bg-red-400"}`}
                                            >
                                                Solo trunks
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2">
                                            <Link href={"/admin/ip/internationallinks"} >
                                                Update Links
                                            </Link>
                                        </div>
                                    </div>
                                    <div 
                                        className={sectionDesplegableStyle}
                                        onClick={() => setShowAlarmsSection(!showAlarmsSection)}
                                    >
                                        <div className={`px-2 ${showAlarmsSection?"rotate-180":""} `}>
                                            <ExpandMoreIcon />
                                        </div>
                                        <div>
                                            Alarmas
                                        </div>
                                    </div>
                                    <div
                                        className={`p-2 ${showAlarmsSection?"":"hidden"}`}
                                    >
                                        <div
                                            onClick={() => setAlarmList("")} 
                                            className="p-2 bg-red-400 text-white w-[100px] flex justify-center hover:bg-yellow-400"
                                        >
                                            Borrar
                                        </div>
                                        <div className="w-full h-[250px]">
                                            
                                            <textarea
                                                value={alarmList}
                                                onChange={(e)=>setAlarmList(e.target.value)}
                                                className="h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-red-500 text-black"
                                            >
                                            </textarea>
                                        </div>
                                        <div className="py-2">
                                            <div className="grid grid-cols-[160px_1fr]">
                                                <div className="p-2 bg-red-400 text-white border-b-[1px] border-white">
                                                    Fecha inicio:
                                                </div>
                                                <div className="p-2 border-[1px] border-b-0 border-red-400">
                                                    {
                                                      titleSMS.date
                                                      ?
                                                      titleSMS.date.toLocaleString('es-ES', {
                                                        day: '2-digit', 
                                                        month: '2-digit', 
                                                        year: 'numeric', 
                                                        hour: '2-digit', 
                                                        minute: '2-digit', 
                                                        hour12: false 
                                                      })
                                                      :
                                                      "--"
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr]">
                                                <div className="p-2 bg-red-400 text-white border-b-[1px] border-white">
                                                    Servicios:
                                                </div>
                                                <div className="p-2 border-[1px] border-b-0 border-red-400">
                                                    {
                                                        titleSMS.text.trim() === beginingSMSTitleText.trim()
                                                        ?
                                                        "--"
                                                        :
                                                        titleSMS.text.trim() 
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr]">
                                                <div className="p-2 bg-red-400 text-white border-b-[1px] border-white">
                                                    Capacidades:
                                                </div>
                                                <div className="p-2 border-[1px] border-b-0 border-red-400">
                                                    {
                                                        textCapacityAfected
                                                        ?
                                                        textCapacityAfected
                                                        :
                                                        "--"
                                                    }
                                                </div>
                                            </div>
                                            <div className="border-[1px] border-red-400">
                                                <div className="p-2 bg-red-400 text-white border-b-[1px] border-white w-[160px]">
                                                    Enlaces Afectados:
                                                </div>
                                                {
                                                    internationalLinksOnlyAfected.map(item =>
                                                        <div className="p-2 text-[14px]">
                                                            {
                                                               `${item.source} ${item.interface} ${item.description}`
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div>
                                
                                <div 
                                    className={sectionDesplegableStyle}
                                    onClick={() => setShowSummary(!showSummary)}
                                >
                                    <div className={`px-2 ${showSummary?"rotate-180":""} `}>
                                        <ExpandMoreIcon />
                                    </div>
                                    <div>
                                        Resumen
                                    </div>
                                    
                                </div>
                                <div className={`${showSummary?"":"hidden"}`}>
                                    <div className="p-2 text-red-900 text-[18px]">
                                        Cantidad de enlaces por capacidad:
                                    </div>
                                    
                                    <div className="flex p-2">
                                        {
                                            summarizedCapacityAfected.map( itemBrief =>
                                                <div className="grid grid-cols-2 w-[200px] gap-2 border-[1px] border-red-400 mr-2">
                                                    <div 
                                                        className={
                                                            `flex justify-center items-center text-white p-2 
                                                            ${filterTable.capacityName.value === itemBrief.id.toLowerCase()?"bg-yellow-400": "bg-red-400"}`
                                                        }
                                                        onClick={() => {
                                                            filterTable.capacityName.value.toLowerCase() === itemBrief.id.toLowerCase()
                                                            ?
                                                            setFilterTable({
                                                                ...filterTable,
                                                                serviceName: {
                                                                    ...filterTable.serviceName,
                                                                    state: false,
                                                                    value: ""
                                                                },
                                                                capacityName: {
                                                                    ...filterTable.capacityName,
                                                                    state: false,
                                                                    value: ""
                                                                },
                                                                intxAfected: {
                                                                    ...filterTable.intxAfected,
                                                                    state: false
                                                                }
                                                            })
                                                            :
                                                            setFilterTable({
                                                                ...filterTable,
                                                                serviceName: {
                                                                    ...filterTable.serviceName,
                                                                    state: false,
                                                                    value: ""
                                                                },
                                                                capacityName: {
                                                                    ...filterTable.capacityName,
                                                                    state: true,
                                                                    value: itemBrief.filter === ""?"otro":itemBrief.id.toLowerCase()
                                                                },
                                                                intxAfected: {
                                                                    ...filterTable.intxAfected,
                                                                    state: false
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        {
                                                            `${itemBrief.id?(itemBrief.id.includes("0")?itemBrief.id+"GE":itemBrief.id):"Desconocido"}`
                                                        }
                                                    </div>
                                                    <div className="flex p-2">
                                                        <div className="flex items-center pr-2">
                                                            {
                                                                `${itemBrief.count}`
                                                            }
                                                        </div>
                                                        {
                                                            itemBrief.afected
                                                            ?
                                                            <div className="h-[30px] w-[30px] bg-red-400 text-white flex justify-center items-center rounded-full">
                                                                {
                                                                    `${itemBrief.afected}`
                                                                }
                                                            </div>
                                                            :
                                                            ""
                                                        }
            
                                                    </div>
                                                </div>
                                            
                                            )
                                        }
                                    </div>
                                    <div className="p-2 text-red-900 text-[18px]">
                                        Cantidad de enlaces por servicio:
                                    </div>
                                    <div className="grid grid-cols-8 p-2 gap-2 text-[14px]">
                                        {
                                            summarizedServices.map( itemBriefService =>
                                                <div className="border-[1px] border-red-200">
                                                    <div className={`flex justify-center text-white p-2 ${filterTable.serviceName.value === itemBriefService.id?"bg-yellow-400":"bg-red-400 "}`}>
                                                        <div 
                                                            className="px-2" 
                                                            onClick={() => 
                                                                filterTable.serviceName.value === itemBriefService.id
                                                                ?
                                                                setFilterTable({
                                                                    ...filterTable,
                                                                    serviceName: {
                                                                        ...filterTable.serviceName,
                                                                        state: false,
                                                                        value: ""
                                                                    },
                                                                    capacityName: {
                                                                        ...filterTable.capacityName,
                                                                        state: false,
                                                                        value: ""
                                                                    },
                                                                    intxAfected: {
                                                                        ...filterTable.intxAfected,
                                                                        state: false
                                                                    }
                                                                })
                                                                :
                                                                setFilterTable({
                                                                    ...filterTable,
                                                                    serviceName: {
                                                                        ...filterTable.serviceName,
                                                                        state: true,
                                                                        value: itemBriefService.id
                                                                    },
                                                                    capacityName: {
                                                                        ...filterTable.capacityName,
                                                                        state: false,
                                                                        value: ""
                                                                    },
                                                                    intxAfected: {
                                                                        ...filterTable.intxAfected,
                                                                        state: false
                                                                    }

                                                                })
                                                            }
                                                        >
                                                            {
                                                                `${itemBriefService.id}:`
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                itemBriefService.count
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            itemBriefService.capacities.map( capacityBrief =>
                                                                <div className="grid grid-cols-2 w-full border-b-[1px]">
                                                                    <div className="border-r-[1px] p-2">
                                                                        {
                                                                            `${capacityBrief.id.includes("0")?capacityBrief.id+"GE":capacityBrief.id}`
                                                                        }
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <div className="p-2">
                                                                            {
                                                                                capacityBrief.count
                                                                            }
                                                                        </div>
                                                                        {
                                                                            capacityBrief.afected
                                                                            ?
                                                                            <div className="h-[30px] w-[30px] bg-red-400 text-white flex justify-center items-center rounded-full p-2">
                                                                                {
                                                                                    capacityBrief.afected
                                                                                }
                                                                            </div>
                                                                            :
                                                                            ""
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
                            
                            <div 
                                className={sectionDesplegableStyle}
                                onClick={() => setShowInterconexions(!showInterconexions)}
                            >
                                <div className={`px-2 ${showInterconexions?"rotate-180":""} `}>
                                    <ExpandMoreIcon />
                                </div>
                                <div>
                                    Lista de interconexiones
                                </div>
                            </div>
                            <div className={`p-2 ${showInterconexions?"":"hidden"}`}>
                                <div className="flex mb-2">

                                    <div 
                                        className={`p-2 text-white ${filterTable.intxAfected.state?"bg-yellow-400":"bg-red-400"}`}
                                        onClick={() => 
                                            filterTable.intxAfected.state
                                            ?
                                            setFilterTable({
                                                ...filterTable,
                                                intxAfected: {
                                                    ...filterTable.intxAfected,
                                                    state: false,
                                                },
                                                capacityName: {
                                                    ...filterTable.capacityName,
                                                    state: false,
                                                    value: ""
                                                },
                                                serviceName: {
                                                    ...filterTable.serviceName,
                                                    state:false,
                                                    value:""
                                                }})
                                            :
                                            setFilterTable({
                                            ...filterTable,
                                            intxAfected: {
                                                ...filterTable.intxAfected,
                                                state: true,
                                            },
                                            capacityName: {
                                                ...filterTable.capacityName,
                                                state: false,
                                                value: ""
                                            },
                                            serviceName: {
                                                ...filterTable.serviceName,
                                                state:false,
                                                value:""
                                            }})
                                        }
                                    >
                                        Afectados
                                    </div>

                                </div>
                                <div className={`${tableRowStyle} bg-red-400 h-[50px]`}>
                                    <div className={tableCellHeaderStyle}>
                                        Equipo
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        Interface
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        Servicio
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        Description
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        Capacidad
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        Trunk configurado
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        IPv4
                                    </div>
                                    <div className={tableCellHeaderStyle}>
                                        IPv6
                                    </div>
                                </div>  
                                {
                                    linksWithAllDataToShow.map( item =>
                                        
                                        <div className={`${tableRowStyle}`}>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.source
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.interface.split("terface")[1]
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.service
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.description
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.kind
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.trunk
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.ipv4
                                                    }
                                            </div>
                                            <div className={tableCellBodyStyle}>
                                                    {
                                                        item.ipv6
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
        </div>
    )
}