
export default function FilterGroup({ selectFilter, changeSelection, dataFilter }) {

     return(
        <div className="w-full">
            <div className="w-full ">
                {
                    dataFilter.map(item => 
                        <button 
                            className={item.selected?"bg-white text-red-500 border-r-[1px] border-white px-4 py-2 border-b-[1px] border-red-500":"bg-red-500 text-white hover:text-red-500 hover:bg-white px-4 py-2 border-r-[1px] border-white transition-all duration-300"}
                            onClick={()=>changeSelection(item.id)}
                        >
                            {item.title}
                        </button>    
                    )
                }
            </div>
        </div>
    )
}