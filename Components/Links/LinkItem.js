import Link from "next/Link"

export default function LinkItem ({ url, name, description }) {

    return(
        <>
           <div className="h-10">
                <Link href={url} target="_blank" >
                    {name}
                </Link>
                <div className="text-xs">
                    {description}
                </div>
            </div>
        </>
    )
}