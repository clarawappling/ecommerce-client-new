import { NavLink, Outlet } from "react-router"
import { Navigation } from "../components/Navigation"
import { Footer } from "../components/Footer"
import { Searchbar } from "../components/Searchbar"

export const Layout = () => {
    
    return (
    <>
    <header> 
        <Navigation />
        <Searchbar />
    </header>
    <main>
        <Outlet />
    </main>

    <footer> <Footer/> <NavLink to={"/admin"}>Adminläge</NavLink> </footer>   
    </>
)
}