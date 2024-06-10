import RoamingContactItem from "./RoamingContactItem";

export default function RoamingContactGroup ({ dataRoamingFiltered,canEdit }) {
    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
            {
                dataRoamingFiltered.map(item => 
                    <RoamingContactItem 
                        id = {item.id}
                        country={item.country} 
                        operator={item.operator} 
                        to={item.to} 
                        subject={item.subject} 
                        cc={item.cc} 
                        body={item.body} 
                        phone={item.phone} 
                        canEdit={canEdit}
                    />
                )
            }
        </div>
    )
}