
export default function infocrq () {

    const titleExceptions = "Trabajos autorizados en POPs durante el día:"
    const conditions = [
        "ATPs de equipos de core IP, previo correo de Alejandro Perales.",
        "Mantenimientos de aires acondicionados, excepto sedes Tecnológicas: 1er Polo, 2do Polo, VES, Arequipa y Trujillo",
        "Trabajos del área “Instalación PINT” de Mercado Corporativo sobre servicios de clientes corporativos. Debe de comunicarse el responsable de Claro y debe encontrarse en sitio",
        "Nuevas instalaciones de aires acondicionados siempre y cuando no energicen ni toquen tableros eléctricos de producción. Supervisión de un personal de Claro, en sitio o en remoto."

    ]

    const titleConsiderations = "Consideraciones al abrir y cerrar CRQ"
    const considerations = [
        "Al abrir CRQs iniciar el registro en notas de Remedy con : “INICIA…”.",
        "Al cerrar CRQs iniciar el registro en notas de Remedy con: “CULMINA…” o “TERMINA…”.",
        "Si una CRQ es cancelada, iniciar el registro en notas de Remedy con: “SE CANCELA…”",

    ]

    return(
        <div>
            <div className="w-full p-4 text-[20px] text-red-900">
                CRQs Observaciones
            </div>
            <div className="p-2 w-full  mt-2" >
                <div className="bg-red-500 text-white p-2">
                    {
                        titleExceptions
                    }
                </div>
                {
                    conditions.map( item => 
                        <div className="border-[1px] border-t-0 border-red-500 p-2">
                            {
                                item
                            }
                        </div>
                    )
                }
            </div>
            <div className="p-2 w-full mt-4" >
                <div className="bg-red-500 text-white p-2">
                    {
                        titleConsiderations
                    }
                </div>
                {
                    considerations.map( item => 
                        <div className="border-[1px] border-t-0 border-red-500 p-2">
                            {
                                item
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}