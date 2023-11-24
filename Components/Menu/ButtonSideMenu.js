import Link from "next/Link"

export default function ButtonSideMenu ( { link, tag } ) {

    return(
        <li className="h-8">
            <Link 
                href={link}
                className="flex h-full w-full items-center pl-4 text-gray-700 hover:bg-red-400 hover:text-white transition-all duration-300 border-b-[1px] border-red-300"
            >
                {tag}
            </Link>
        </li>
    )
}