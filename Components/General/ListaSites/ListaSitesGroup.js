"use client"

import { DataGrid } from '@mui/x-data-grid';

export default function ListaSitesGroup({ dataFiltered }) {

    const columns = [
        { field: 'Codigo', headerName: 'Código', width: 140 },
        { field: 'Nombre', headerName: 'Nombre', width: 300 },
        { field: 'Estado', headerName: 'Estado', width: 70 },
        { field: 'Subregion', headerName: 'Subregion', width: 90 },
        { field: 'Tecnologias', headerName: 'Tecnologías', width: 90 },
        { field: 'Longitud', headerName: 'Longitud', width: 150 },
        { field: 'Latitud', headerName: 'Latitud', width: 150 },
        { field: 'Departamento', headerName: 'Departamento', width: 200 },
        { field: 'Provincia', headerName: 'Provincia', width: 200 },
        { field: 'Distrito', headerName: 'Distrito', width: 200 },
        { field: 'CentroPoblado', headerName: 'Centro Poblado', width: 200 },
        { field: 'Direccion', headerName: 'Dirección', width: 400 },
        
    ];

    // const rows = [
    //     { id: 1, Codigo: "abc", Site: 'Snow', Servicios: 'Jon', Equipo: "equipo", Tipo: "tipo", Distrito: "distrito", Provincia: "provincia", Departamento: "departamento" },
    // ];

    const rows = dataFiltered.map( item => {
        return(
            { 
                id: item.id,
                Codigo: item.attributes.papcode,
                Nombre: item.attributes.papname,
                Estado: item.attributes.papstate,
                Subregion: item.attributes.subregion,
                Tecnologias: item.attributes.tecnologies,
                Longitud: item.attributes.longitude,
                Latitud: item.attributes.latitude,
                Departamento: item.attributes.department,
                Provincia:item.attributes.province,
                Distrito: item.attributes.district,
                CentroPoblado: item.attributes.populatedcenter,
                Direccion: item.attributes.address,
            }
        )
    })

    return(
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 13 },
                },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}
