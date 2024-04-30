export default function escalations () {

    const escalationList = [
        {
            data: `
            ESCALAMIENTO NOC BACKBONE CLARO AR, PY, UY
            Nivel	Horas	Descripción	Nombre	Teléfono	E-mail
            1	Inmediato	NOC (7x24)	Operador de Turno	+54 351 4149110	NOC@claro.com.ar
            2	1 hora	Supervisor NOC	Supervisor de Turno	+54 351 4146248	supervisionNOC.ar@claro.com.ar
            3	2 horas	Jefe de NOC	Marcelo Fuertes	+549 351 7585064	mfuertes@claro.com.ar
            4	4 horas	Gerente de COR	Diego Boldini	+549 351 3505288	dboldini@claro.com.ar
            5	8 horas	Director de Operaciones	Sergio Pierresteguy	+549 223 5200904	spierreste@claro.com.ar
            `
        }
    ]

    return(
        <div className="h-full w-full grid grid-cols-2">
            <textarea className="h-[200px] w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black" spellcheck="false" >
                {
                    escalationList[0].data
                }
            </textarea >

        </div>
    )
}