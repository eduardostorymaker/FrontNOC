"use client"
import { useState } from "react"

import SideMenu from "../Menu/SideMenu"

import firstMenu from "../../data/navigation/firstMenu.json"

export default function SideBar() {

    const [menu,setMenu] = useState(firstMenu)
    console.log(menu)
    console.log("menu")

    const toggleShowMenu = (id) => {
        console.log("toggle")
        const setToggle = menu.map( item => {
            if (item.id === id) {
                if (item.show) {
                    return({
                        ...item,
                        show:false
                    })
                } else {
                    return({
                        ...item,
                        show:true
                    })
                }
            } else {
                return({
                    ...item
                })
            }
        })
        setMenu(setToggle)
    }

     return(
        <section className="border-2 border-red-200 h-full text-md">
            <div>
                <ul>
                    <SideMenu menu={menu} toggleShowMenu={toggleShowMenu} />
                </ul>
            </div>
        </section>
    )
}