import Header from "./Header"
import SideBar from "./SideBar"
export default function Layout({children}) {

    return(
        <div className="h-[900px]">
            <Header />
            <section className="grid grid-cols-8 h-full">
                <div className="col-span-1 h-full">
                    <SideBar />
                </div>
                <div className="col-span-7 h-full">
                    {children}
                </div>
            </section>
        </div>
    )
}