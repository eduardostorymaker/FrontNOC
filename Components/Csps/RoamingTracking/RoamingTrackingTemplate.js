
"use client"
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RoamingTrackingTemplate() {

    const [dataRoamingList,setDataRoamingList] = useState("")
    const [dataFilter,setDataFilter] = useState("")
    const dataFiltered = dataRoamingList?dataRoamingList.filter(item => 
        item.title.toLowerCase().includes(dataFilter.toLowerCase())
        ||
        item.indicators.toLowerCase().includes(dataFilter.toLowerCase())
        ||
        item.impact.toLowerCase().includes(dataFilter.toLowerCase())
        ||
        item.reason.toLowerCase().includes(dataFilter.toLowerCase())
        ||
        item.boticket.toLowerCase().includes(dataFilter.toLowerCase())
        ||
        item.inocticket.toLowerCase().includes(dataFilter.toLowerCase())
    ):""

    useEffect(()=>{
        const url = "http://172.19.128.128:3060/api/roamingtracking"
        fetch(url,{cache:"no-store"})
            .then(res => res.json())
            .then(data => setDataRoamingList(data.data))
    },[])

    const HeaderStyles= `bg-red-500 text-white`

    const columns = [
        { 
            field: 'Open',
            headerName: 'Open',
            width: 80,
            headerClassName:HeaderStyles,
            renderCell: (params) => {
                return <button className="w-full bg-yellow-500 px-2 text-white hover:bg-yellow-300 transition ease-in-out ">Abrir</button>
            }
        },
        { field: 'Id', headerName: 'Id', width: 70, headerClassName:HeaderStyles  },
        { field: 'Inicio', headerName: 'Inicio', width: 150, headerClassName:HeaderStyles  },
        { field: 'Titulo', headerName: 'Titulo', width: 500, headerClassName:HeaderStyles  },
        { field: 'Afectacion', headerName: 'Afectacion', width: 600, headerClassName:HeaderStyles  },
        { field: 'Reclamos', headerName: 'Reclamos AR', width: 105, headerClassName:HeaderStyles  },
        { field: 'BackOffice', headerName: 'BackOffice', width: 300, headerClassName:HeaderStyles  },
        { field: 'INOC', headerName: 'INOC', width: 300, headerClassName:HeaderStyles  }
        
    ];

    const rows = dataRoamingList?dataFiltered.map( item => {
        const following = item.ticket?stringToArrayObject(item.ticket).find(item => item.current):""

        return(
            { 
                id: item.id,
                Open: "Abrir",
                Id: item.id,
                Titulo: item.title,
                Inicio: (new Date(item.starttime)).toLocaleString('es-ES'),
                Afectacion: item.impact,
                Reclamos: item.complains?"SI":"NO",
                BackOffice: item.boticket,
                INOC: item.inocticket,
            }
        )
    }):[]

    const router = useRouter()

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e)
        if (e.field === "Open" ) {
            //console.log("mapa")
            router.push(`/csps/roamingtracking/${e.row.Id}`)
        }
    }

    return(
        <div>
            {
                dataRoamingList
                ?
                <div>
                    <div className='h-[50px] w-full mb-2 flex justify-between bg-red-500'>
                        <div className='h-full flex items-center p-2'>
                            <input type="text" value={dataFilter} onChange={(e)=>setDataFilter(e.target.value)} className='rounded-md p-2' />
                        </div>
                        <div className='h-full flex items-center'>
                            <div className='p-2 bg-yellow-400 text-white mr-2' onClick={()=>router.push("/csps/roamingtracking/new")} >
                                Nuevo
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-full'>
                        <DataGrid
                            onCellClick={onClickEvent}
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>

                </div>
                :
                "Cargando..."
            }
        </div>
    )
}