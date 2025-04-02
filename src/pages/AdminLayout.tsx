import { NavLink, Outlet } from "react-router"
import { NavigationAdmin } from "../components/NavigationAdmin"

export const AdminLayout = () => {
return ( 
    <>
    <header>
        <NavigationAdmin />
    </header>
    <main>
        <Outlet />
    </main>        
    <footer> <NavLink to={"/"}> &lt;&lt; Tillbaka till kundens vy</NavLink> </footer>    
    </>
)
}