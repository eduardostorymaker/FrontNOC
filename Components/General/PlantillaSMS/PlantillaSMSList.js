"use client"

import Link from "next/link"

export default function PlantillaSMSList ({params}) {
    console.log(params)
    const cellStyle = "pl-2"
    return(
        <div className="p-2">
            <div className="flex justify-between py-2 mb-2">
                <div className="p-2 bg-gray-400 text-white">
                    {
                        params.groupid.toUpperCase()
                    }
                </div>
                <div>
                    <Link className="bg-red-400 p-2 text-white mr-2" href={`/general/plantillasms/`}>
                        Regresar
                    </Link>
                    <Link className="bg-yellow-400 p-2 text-white" href={`/general/plantillasms/${params.groupid}/new`}>
                        Nuevo
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <div className="grid grid-cols-6 bg-red-400 text-white">
                            <div className={cellStyle}>
                                Falla
                            </div>
                            <div className={cellStyle}>
                               Estado 
                            </div>
                            <div className={cellStyle}>
                                Hora inicio
                            </div>
                            <div className={cellStyle}>
                                Atiende
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}