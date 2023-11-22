
import LinkItem from "./LinkItem"


const filterListByName = (name, list) => {
    console.log("list")
    console.log(list.data[0].attributes.group.data.attributes.name)
    const dataFiltered = list.data.filter(item=>item.attributes.group.data.attributes.name === name)
    return dataFiltered || []
}

export default function LinkGroup ({ groupName, dataLinks }) {

    const dataFiltered = filterListByName(groupName,dataLinks)

    return(
        <div className="h-full min-w-[200px] max-w-[350px] mb-6">
            <div className="flex flex-col shadow-lg shadow-red-500/50 rounded-xl pb-4 overflow-hidden">
                <div className="flex w-full font-bold justify-center text-white py-3 bg-red-500 ">
                    <h3>
                        {groupName}
                    </h3>
                </div>
                <div>
                    {
                        dataFiltered?.map(item => 
                            <LinkItem url={item.attributes.url} name={item.attributes.name} description={item.attributes.description} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}