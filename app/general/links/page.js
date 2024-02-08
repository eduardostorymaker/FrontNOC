import LinksPageTemplate from "../../../Components/General/Links/LinksPageTemplate"

const getDataLinks = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/datalinks?populate=*&sort[0]=priority:desc", {cache: 'no-cache'})
    const data = await res.json()
    return data
}

const getLinkGroup = async () => {
    const res = await fetch("http://172.19.128.128:1337/api/linkgroups?sort[0]=priority:desc", {cache: 'no-cache'})
    const data = await res.json()
    return data
}


export default async function Links() {

    const getLinks = await getDataLinks()
    const getGroup = await getLinkGroup()

    return(
        <LinksPageTemplate getLinks={getLinks} getGroup={getGroup} />
    )
}

