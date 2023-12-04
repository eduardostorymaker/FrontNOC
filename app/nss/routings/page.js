const routingNumbers = [
"20 - nextel",
"21 - America   movil",
"22 - Movistar",
"24 - Viettel",
"30 - Convergia   Peru",
"31 - IDT",
"32 - TDP",
"33 - Telmex",
"34 - Global   Crossing - Level 3",
"35 - Gilat",
"36 - Gamacom",
"37 - Americatel",
"38 - perusat",
"39 - perusat",
"40 - Sitel",
"41 - Valtron",
"42 - Rural",
"43 - Amitel",
"44 - LD   Telecom",
"45 - Infoductos",
"46 - Netline",
"47 - TESAM",
]

export default function routings() {

    return(
        <div className="w-full">
            <div className="flex flex-col items-center p-4 ">
                <h2 className="text-xl font-bold text-red-500">
                    Routing Number
                </h2>
                <p className="text-gray-400">
                    Identificadores de llamadas a operadores
                </p>
            </div>
            <div className="p-4 text-gray-700">
                {
                    routingNumbers.map(item=>
                        <p>
                            {
                                item
                            }
                        </p>    
                    )
                }

            </div>
        </div>
    )
}