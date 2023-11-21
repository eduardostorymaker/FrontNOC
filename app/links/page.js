import LinkGroup from "../../Components/Links/LinkGroup"

const getDataLinks = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/datalinks?populate=*&sort[0]=priority:desc", {cache: 'no-store'})
    const data = await res.json()
    return data
}

const getLinkGroup = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/linkgroups", {cache: 'no-store'})
    const data = await res.json()
    return data
}


export default async function Links() {

    const getLinks = await getDataLinks()
    const getGroup = await getLinkGroup()

    return(
        <div className="w-full flex p-4 flex-wrap justify-around">
            {
                getGroup?.data?.map(item =>
                    <LinkGroup key={item.id} groupName={item.attributes.name} dataLinks={getLinks} />
                )
            }
        </div>
    )
}

// className="grid grid-cols-4 gap-4 p-4"