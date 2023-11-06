'use client'
export default function CategoryList({categories}) {

    return(
        <>
        {
            categories?.data?.map(item=>
                <p key={item.attributes.Name}>{item.attributes.Name}</p>
            )
        }
        </>
    )
}