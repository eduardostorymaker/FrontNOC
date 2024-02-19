import { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';

import Switch from '@mui/material/Switch';

export default function MapSectionFilter ({ 
    radioValue,
    setRadioValue,
    dataSites,
    setSiteSelected,
    showToolTip,
    setShowToolTip,
    textFilter,
    setTextFilter 
}) {

    const headerStyles = `bg-red-500 text-white`

    const columns = [
        
        { 
            field: 'Seleccionar',
            headerName: 'Acción',
            width: 140,
            headerClassName: headerStyles,
            renderCell: (params) => {
                return <button className="bg-yellow-500 px-2 text-white hover:bg-yellow-300 transition ease-in-out ">Seleccionar</button>
            }
        },
        { field: 'Codigo', headerName: 'Código', width: 140, headerClassName:headerStyles },
        { field: 'Nombre', headerName: 'Nombre', width: 300, headerClassName:headerStyles },
        { field: 'Tecnologias', headerName: 'Tecnologías', width: 90, headerClassName:headerStyles },
        { field: 'Longitud', headerName: 'Longitud', width: 150, headerClassName:headerStyles },
        { field: 'Latitud', headerName: 'Latitud', width: 150, headerClassName:headerStyles },
        { field: 'Departamento', headerName: 'Departamento', width: 200, headerClassName:headerStyles },
        { field: 'Provincia', headerName: 'Provincia', width: 200, headerClassName:headerStyles },
        { field: 'Distrito', headerName: 'Distrito', width: 200, headerClassName:headerStyles },
        { field: 'CentroPoblado', headerName: 'Centro Poblado', width: 200, headerClassName:headerStyles },
        { field: 'Direccion', headerName: 'Dirección', width: 400, headerClassName:headerStyles },
        
    ];

    const dataFiltered = dataSites.filter(item => 
        item.attributes.papcode.toLowerCase().includes(textFilter.toLowerCase().trim()) 
        ||
        item.attributes.papname.toLowerCase().includes(textFilter.toLowerCase().trim()) 
    )

    const rows = dataFiltered.map( item => {
        return(
            { 
                id: item.id,
                Seleccionar: "",
                Codigo: item.attributes.papcode,
                Nombre: item.attributes.papname,
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

    const [localRadio,setLocalRadio] = useState(radioValue)
    
    const onChangeRadioValue = (e) => {
        setLocalRadio(e.target.value)
    }

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e.row)
        if (e.field === "Seleccionar" ) {
            //console.log("mapa")
            setSiteSelected(dataSites.find(item => {
                
                if (item.id === e.row.id) {
                    //console.log(item)
                    return true
                }
            }))
            
        }
    }

    const searchText = (e) => {
        setTextFilter(e.target.value)
    }

    return(
        <div className="w-full h-full">
            
            <div className="flex flex-col">
                <div className="flex bg-red-500">
                    <div className="flex items-center border-r-[1px] border-white px-2">
                        <input 
                            className="px-2 rounded-md"
                            type="text"
                            onChange={searchText}
                            value={textFilter}
                            placeholder="Nombre o Código de Site"
                        />
                    </div>
                    <div className="flex items-center border-r-[1px] border-white  px-2">
                        <div className="text-white">
                            Etiqueta
                        </div> 
                        <Switch
                            checked={showToolTip}
                            onChange={(e) => setShowToolTip(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            label="Etiqueta"
                            color="warning"
                        />
                    </div>
                    <div className="flex items-center border-r-[1px] border-white pl-2" >
                        <input 
                            className="w-[40px] flex text-right"
                            type="number" 
                            value={localRadio}
                            onChange={onChangeRadioValue}
                        />

                        <span className="text-white px-2">
                            km a la redonda
                        </span>
                        <button
                            className="bg-yellow-500 text-white p-2 "
                            onClick={() => setRadioValue(localRadio)}
                        >
                            Actualizar
                        </button>

                    </div>
                </div>
                <div className="w-full">
                
                    <DataGrid
                        onCellClick={onClickEvent}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 3 },
                            },
                        }}
                        density="compact"
                    />
                </div>

 
            </div>
        </div>
    )
}