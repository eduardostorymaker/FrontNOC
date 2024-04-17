import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

export default function FaultTrackingGroup ({ dataFiltered, onSelect, setCodeSiteSelected }) {

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
        { field: 'Estado', headerName: 'Estado', width: 140, headerClassName:HeaderStyles  },
        { field: 'Incidencia', headerName: 'Incidencia', width: 140, headerClassName:HeaderStyles  },
        { field: 'Titulo', headerName: 'Titulo', width: 600, headerClassName:HeaderStyles  },
        { field: 'Inicio', headerName: 'Inicio', width: 200, headerClassName:HeaderStyles  },
        { field: 'Fin', headerName: 'Fin', width: 200, headerClassName:HeaderStyles  },
  
        
    ];

    // const rows = [
    //     { id: 1, Codigo: "abc", Site: 'Snow', Servicios: 'Jon', Equipo: "equipo", Tipo: "tipo", Distrito: "distrito", Provincia: "provincia", Departamento: "departamento" },
    // ];

    const rows = dataFiltered.map( item => {
        return(
            { 
                id: item.id,
                Open: "Abrir",
                Id: item.id,
                Estado: item.state,
                Incidencia: item.ticket,
                Titulo: item.title,
                Inicio: (new Date(item.starttime)).toLocaleString('es-ES'),
                Fin: (new Date(item.endtime)).toLocaleString('es-ES'),

            }
        )
    })

    const router = useRouter()

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e)
        if (e.field === "Open" ) {
            //console.log("mapa")
            router.push(`/ipmpls/faulttracking/${e.row.Id}`)
        }
    }

    return(
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
    )
}
