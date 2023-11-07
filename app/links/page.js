import LinkGroup from "../../Components/Links/LinkGroup"

const getDataLinks = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/datalinks?populate=*&sort[0]=priority:desc")
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
        <div className="flex">
            {
                getGroup?.data?.map(item =>
                    <LinkGroup key={item.id} groupName={item.attributes.name} dataLinks={getLinks} />
                )
            }
        </div>
    )
}