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
        <div className="p-4">
            {
                routingNumbers.map(item =>
                    <p>
                        {
                            item
                        }
                    </p>
                )
            }
        </div>
    )
}