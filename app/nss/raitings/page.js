
const raitingGroup = [
"1 - URLs Gratuitas/MMS/Blackberry/Portal   cautivo/DNS",
"2 - Tráfico Web Claro / URLs Cobrados",
"3 - Tráfico Wap",
"5 - Tráfico DNS",
"6 - Tráfico web L4",
"7 - Tráfico wap.claro Gratuito",
"8 - Tráfico 4G ilimitado / trafico TDD (wimax, datace)",
"9 - Tráfico OLO/ Cuy",
"10 - Trafico usuarios corporativos / apn personalizado",
"12- Tráfico BAM",
"20- Tethering",
"21 - Tráfico Free Token",
"23 - speedtest/gratuito",
"24 - Tráfico líneas AVL",
"25 - Facebook/Twitter",
"26 - Whatsapp",
"27 - Twitter",
"28 - Correo",
"29 - Facebook Lite",
"30 - Tráfico Smart AdServer",
"31 - Pokemon GO",
"32 - Snapchat",
"33 - clarovideo",
"34 - youtube",
"35 - waze",
"36 - instagram full",
"38 - instagram fotos",
"42 - fb flex",
"43 - ig_test",
"44 - tiktok",
"45 - webex/teams/zoom",
"47 - telegram/signal",
"51 - señalizacion",
"52 - trafico gratuito olo/cuy"
]

export default function () {

    return (
        <div className="p-4">
            {
                raitingGroup.map(item=>
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