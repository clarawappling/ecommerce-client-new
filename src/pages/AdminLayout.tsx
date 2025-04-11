import { NavLink, Outlet } from "react-router"
import { NavigationAdmin } from "../components/NavigationAdmin"

export const AdminLayout = () => {
return ( 
    <>
    <header>
        <div className="admin-header">
        <NavigationAdmin />
        </div>
    </header>
    <main>
        <Outlet />
    </main>        
    <footer> <NavLink to={"/"}> &lt;&lt; Tillbaka till kundens vy</NavLink> </footer>    
    </>
)
}