import Header from "./Header"
import SideBar from "./SideBar"
export default function Layout({children}) {

    return(
        <div className="h-full">
            <div className="h-full">
                <header className="h-[80px] sticky top-0 z-30 bg-red-600 shadow-md shadow-red-300/500">
                    <Header />
                </header>
                <div className="grid grid-cols-[250px_1fr] h-[calc(100%-80px)] overflow-hidden">
                    <aside className="h-full overflow-hidden">
                        <SideBar />
                    </aside>
                    <section className="h-full overflow-hidden">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    )
}