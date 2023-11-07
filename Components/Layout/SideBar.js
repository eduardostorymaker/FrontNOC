import Link from "next/Link"

import SideMenu from "../Menu/SideMenu"

export default function SideBar() {

    const menu = [
        {
            tag: "Enlaces de interes",
            link: "/links",
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
        <section className="border py-2 h-full">
            <div>
                <ul>
                    <SideMenu menu={menu} />
                </ul>
            </div>
        </section>
    )
}