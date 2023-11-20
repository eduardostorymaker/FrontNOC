import CardLine from "./CardLine";

const filterList = (list, name) => {
    const filteredList = list.datacontacts.data.filter(item => item.attributes.workteam.data.attributes.name === name)
    const orderedList = filteredList.sort((a,b) => (a.attributes.type.data.attributes.name > b.attributes.type.data.attributes.name ? -1 : a.attributes.type.data.attributes.name < b.attributes.type.data.attributes.name ? 1 : 0 ))
    return filteredList || []
}

export default function ContactCard ({ name, description, list }) {

    const filteredList = filterList(list, name)

    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-red-500/50">
            <div className="bg-red-500 p-4 text-white font-bold">
                <div>
                    {
                        name
                    }
                </div>
                <div className="text-xs text-red-200">
                    {
                        description
                    }
                </div>
            </div>
            <div className="py-4">
                {
                    filteredList.map( item => 
                        <CardLine key={item.id} value={item.attributes.value} type={item.attributes.type.data.attributes.type} />
                    )
                }
 
            </div>

        </div>
    )
}