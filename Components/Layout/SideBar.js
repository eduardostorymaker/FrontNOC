import Link from "next/Link"

import SideMenu from "../Menu/SideMenu"

export default function SideBar() {

    const menu = [
        {
            tag: "Home",
            link: "/",
            submenu: [
                {
                    tag: "Home",
                    link: "/"
                },
                {
                    tag: "Categorias",
                    link: "/categories"
                },
                {
                    tag: "Google",
                    link: "https://www.google.com"
                }
            ]
        },
        {
            tag: "Categorias",
            link: "/categories",
            submenu: []
        },
        {
            tag: "Google",
            link: "https://www.google.com",
            submenu: []
        }
    ]


    return(
        <section className="border py-2 h-full">
            <div>
                <ul>
                    <li>
                        Menu
                    </li>
                    <SideMenu menu={menu} />

                    <li>
                        <ul>
                           
                        </ul>
                    </li>
                    
                </ul>

                <ul>
                    <li>
                        Menu1
                    </li>
                    <li data-popover-target="popover-default">
                        Menu2
                    </li>

                    <li>
                        <ul data-popover id="popover-default" className="invisible">
                            <li>
                                Menu1
                            </li>
                            <li>
                                Menu2
                            </li>
                        </ul>
                    </li>
                    
                </ul>

                <div>

                    

                </div>

            </div>
        </section>
    )
}