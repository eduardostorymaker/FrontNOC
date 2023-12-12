"use client"
import { useState } from "react"

import SideMenu from "../Menu/SideMenu"

import firstMenu from "../../data/navigation/firstMenu.json"

export default function SideBar() {

    const [menu,setMenu] = useState(firstMenu)

    const toggleShowMenu = (id) => {
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

    const onSelect = (menuId,submenuId) => {
        const setOnSelect = menu.map( item => {
            if(item.id === menuId) {
                const submenu = item.submenu.map(subItem => {
                    if(subItem.id === submenuId) {
                        return ({
                            ...subItem,
                            selected: true
                        })
                    } else {
                        return({
                            ...subItem,
                            selected: false
                        })
                    }
                })
                return ({
                    ...item,
                    submenu
                })
            } else {
                const submenu = item.submenu.map(subItem => {
                    return ({
                        ...subItem,
                        selected:false
                    })
                })
                return ({
                    ...item,
                    submenu
                })
            }
        })
        setMenu(setOnSelect)
    }

    return(
        <section className="border-2 border-red-200 h-full text-md">
            <div>
                <ul>
                    <SideMenu menu={menu} toggleShowMenu={toggleShowMenu} onSelect={onSelect} />
                </ul>
            </div>
        </section>
    )
}