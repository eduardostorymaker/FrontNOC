import Link from "next/Link"

export default function BotonMenu ( { link, tag } ) {

    return(
        <li className="h-8">
            <Link 
                href={link}
                className="flex h-full w-full items-center px-2 hover:bg-blue-200"
            >
                {tag}
            </Link>
        </li>
    )
}