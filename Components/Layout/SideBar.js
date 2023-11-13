import Link from "next/Link"

import SideMenu from "../Menu/SideMenu"

export default function SideBar() {

    const menu = [
        {
            tag: "Enlaces",
            link: "/links",
            submenu: []
        },
        {
            tag: "Contactos",
            link: "/contacts",
            submenu: []
        }
    ]

    // const menu = [
    //     {
    //         tag: "Home",
    //         link: "/",
    //         submenu: [
    //             {
    //                 tag: "Home",
    //                 link: "/"
    //             },
    //             {
    //                 tag: "Categorias",
    //                 link: "/categories"
    //             },
    //             {
    //                 tag: "Google",
    //                 link: "https://www.google.com"
    //             }
    //         ]
    //     },
    //     {
    //         tag: "Categorias",
    //         link: "/categories",
    //         submenu: []
    //     },
    //     {
    //         tag: "Google",
    //         link: "https://www.google.com",
    //         submenu: []
    //     }
    // ]


    return(
        <section className="border-2 border-red-200 py-2 h-full text-md font-bold">
            <div>
                <ul>
                    <SideMenu menu={menu} />
                </ul>
            </div>
        </section>
    )
}