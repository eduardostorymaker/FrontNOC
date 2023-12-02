'use client'
export default function CardLine({ value, type }) {

    return(
        <div className="flex w-full border-b-2 border-red-100">
            <div className="flex py-2 px-4 w-full break-words">
                <div className="mr-2 text-gray-500 ">
                        {
                            type
                        }:
                </div>
                <div className=" text-gray-900 w-full overflow-hidden">
                    {
                        value
                    }
                </div>
            </div>
            
        </div>
    )
}