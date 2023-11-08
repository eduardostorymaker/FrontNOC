import Link from "next/Link"

export default function BotonMenu ( { link, tag } ) {

    return(
        <li className="h-8">
            <Link 
                href={link}
                className="flex h-full w-full items-center px-2 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
                {tag}
            </Link>
        </li>
    )
}