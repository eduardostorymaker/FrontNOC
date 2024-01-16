export default function ipmplscommands () {

    const thStyles = "border border-red-300 text-white bg-red-500"
    const tdStyles = "border border-red-300 p-2"
    const lineStyle = "before:content-['>']"

    const dataCommands = [
        {
            id: 1,
            description:"Cuánto tiempo esta encendido el equipo",
            zte: [
                "show ver"
            ],
            huawei:[
                "display version"
            ],
            nokia:[
                "show uptime"
            ],
            cisco:[

            ]
        },
        {
            id: 2,
            description:"Temperatura del equipo",
            zte: [
                "show temperature detail"
            ],
            huawei:[
                "display  temperature",
                "display  temperature | exclude NORMAL"
            ],
            nokia:[
                "show card detail | match Temperature"
            ],
            cisco:[

            ]
        },
        {
            id: 3,
            description:"Resumen de puertos",
            zte: [
                
            ],
            huawei:[
                
            ],
            nokia:[
                "show port description"
            ],
            cisco:[

            ]
        },
        {
            id: 4,
            description:"Detalle de puertos",
            zte: [
                "show interface xgei-1/0/2/0"
            ],
            huawei:[
                "display interface GigabitEthernet 6/0/7"
            ],
            nokia:[
                "show port 1/1/8"
            ],
            cisco:[

            ]
        },
        {
            id: 5,
            description:"Potencias de los puertos",
            zte: [
                "show opticalinfo xgei-1/1/0/1",
                "show opticalinfo brief"
            ],
            huawei:[
                "display interface phy-option GigabitEthernet 6/0/7",
                "display interface phy-option"
            ],
            nokia:[
                "show port 1/1/8 optical"
            ],
            cisco:[

            ]
        }
    ]
    

    return(
        <div className="w-full p-4">
            <table className="w-full border-separate border border-red-400 table-fixed">
                <thead className="">
                    <tr>
                        <th className={thStyles} ></th>
                        <th className={thStyles}>ZTE</th>
                        <th className={thStyles}>Huawei</th>
                        <th className={thStyles}>Nokia</th>
                        <th className={thStyles}>Cisco</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        dataCommands.map(item =>
                            <tr>
                                <td className={`${tdStyles} bg-red-500 text-white font-bold`} >
                                    {
                                        item.description
                                    }
                                </td>
                                <td className={tdStyles} >
                                    {
                                        item.zte.map( zte => 
                                            <p className={lineStyle} >
                                                {zte}
                                            </p>    
                                        )
                                    }
                                </td>
                                <td className={tdStyles} >
                                    {
                                        item.huawei.map( huawei => 
                                            <p className={lineStyle} >
                                                {huawei}
                                            </p>    
                                        )
                                    }
                                </td>
                                <td className={tdStyles} >
                                    {
                                        item.nokia.map( nokia => 
                                            <p className={lineStyle} >
                                                {nokia}
                                            </p>    
                                        )
                                    }
                                </td>
                                <td className={tdStyles} >
                                    {
                                        item.cisco.map( cisco => 
                                            <p className={lineStyle} >
                                                {cisco}
                                            </p>    
                                        )
                                    }
                                </td>

                            </tr>
                        )
                    }
                    
                </tbody>
            </table>
            
        </div>
    )
}