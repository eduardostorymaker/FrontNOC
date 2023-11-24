"use client"
import { useState } from "react"

import SideMenu from "../Menu/SideMenu"

const firstMenu = [
    {
        id: 1,
        tag: "Interés",
        show: true,
        submenu: [
            { 
                id:1,
                tag: "Enlaces",
                link: "/links",
            },
            { 
                id:2,
                tag: "Contactos",
                link: "/contacts",
            }
        ]
    },
    {
        id: 2,
        tag: "PACO",
        show: true,
        submenu: [
            
        ]
    },
    {
        id: 3,
        tag: "NSS",
        show: true,
        submenu: [
            { 
                id:1,
                tag: "Raiting Group",
                link: "/nss/raitings",
            },
            { 
                id:2,
                tag: "Routing Numbers",
                link: "/nss/routings",
            }
        ]
    },
]

export default function SideBar() {

    const [menu,setMenu] = useState(firstMenu)

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