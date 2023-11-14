import Header from "./Header"
import SideBar from "./SideBar"

export default function Layout({children}) {

    return(
        <div className="h-full">
            
            <div className="h-full">
                <header className="h-[80px] sticky top-0 z-30 bg-red-600 shadow-md shadow-red-300/500">
                    <Header />
                </header>
                <div className="grid grid-cols-8 h-[calc(100%-80px)]">
                    <aside className="col-span-1 h-full overflow-hidden">
                        <SideBar />
                    </aside>
                    <section className="col-span-7 h-full overflow-scroll">
                        {children}
                    </section>
                </div>
            </div>
            
        </div>
    )
}