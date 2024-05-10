import LinksPageDynamic from "../../../../Components/General/Links/dynamic/LinksPageDynamic";

export default function pageid ({params}) {

    return(
        <div className="h-full w-full">
            <LinksPageDynamic params={params} />
        </div>
    )
}