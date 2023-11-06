import BotonMenu from "./BotonMenu"

export default function SideMenu({ menu }) {

    return(
        <>
        {
            menu.map(item=> {
                if (item.submenu) {
                    return (
                        <>
                            <BotonMenu link={item.link} tag={item.tag} />
                            <ul className="h-full w-full px-2">
                                <SideMenu menu={item.submenu} />
                            </ul>
                        </>
                    )
                } else {
                    return (
                        <>
                            <BotonMenu link={item.link} tag={item.tag} />
                        </>
                    )
                }
                
            }
            )
        }
        </>
    )
}