import ButtonSideMenu from "./ButtonSideMenu";

const filterMenuByTag = (allMenu, tag) => {
    const filteredMenu = allMenu.filter(item => item.tag === tag)
    return filteredMenu[0].submenu
}

export default function ItemSideMenu({ tag, show, allMenu }) {

    const filteredList = filterMenuByTag(allMenu, tag)

    const displayedStyles = ""
    const nonDisplayedStyles = "hidden"

    return(
        <div>
            <div className="flex justify-between bg-black border-b border-white text-white h-10 items-center px-2">
                <div>
                    {tag}
                </div>
                <div>
                    
                </div>
            </div>
            <div className={show?displayedStyles:nonDisplayedStyles}>
                {
                    filteredList.map(item => 
                            <ButtonSideMenu link={item.link} tag={item.tag} />
                    )
                }
            </div>
        </div>
    )
}