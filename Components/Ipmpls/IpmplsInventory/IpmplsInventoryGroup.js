import IpmplsInventoryItem from "./IpmplsInventoryItem";

export default function IpmplsInvetoryGroup({ dataFiltered }) {

    return(
        <div className="w-full">
            <table>
                <tbody>
                    {
                        dataFiltered.map(item => 
                            <IpmplsInventoryItem 
                                name={item.attributes.name} 
                                type={item.attributes.type} 
                                siteId={item.attributes.site?.data?.attributes?.papcode} 
                                siteName={item.attributes.site?.data?.attributes?.papname} 
                                tecnologies={item.attributes.site?.data?.attributes?.tecnologies} 
                                district={item.attributes.site?.data?.attributes?.district} 
                                province={item.attributes.site?.data?.attributes?.province} 
                                department={item.attributes.site?.data?.attributes?.department} 
                            />
                        )
                    }

                </tbody>

            </table>
        </div>
    )
}