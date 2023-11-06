// 'use client'

// import { useState,useEffect } from "react"

import { Suspense } from "react"

import CategoryList from "../../Components/Category/CategoryList"

async function getDataCategories() {
    const res = await fetch('http://172.19.128.128:1337/api/categories')
    const data = await res.json()
    await new Promise((resolve)=> setTimeout(resolve,3000))
    return data
}

export default async function CategoriesList() {

    // const [categories,setCategories] = useState([])

    // useEffect(()=>{
    //     fetch('http://172.19.128.128:1337/api/categories')
    //         .then(res => res.json())
    //         .then(data => setCategories(data))
    // },[])

    const categories = await getDataCategories()

    //console.log(categories?.data[0].id)

    return(
        <div>
            <p>Categories</p>
            <Suspense fallback={<div>Cargando categorias</div>}>
                <CategoryList categories={categories} />

            </Suspense>

        </div>
    )
}