import RoamingContactItem from "./RoamingContactItem";

export default function RoamingContactGroup ({ dataRoamingFiltered }) {
    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
            {
                dataRoamingFiltered.map(item => 
                    <RoamingContactItem 
                        country={item.attributes?.country?.data?.attributes?.name} 
                        operator={item.attributes?.name} to={item.attributes?.to} 
                        subject={item.attributes?.subject} cc={item.attributes?.cc} 
                        body={item.attributes?.body} 
                        telephone={item.attributes?.telephone} 
                    />
                )
            }
        </div>
    )
}