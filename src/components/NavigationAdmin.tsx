import { NavLink } from "react-router"
import "../styles/Navigation.css"

export const NavigationAdmin = () => {
    
    return (
        <nav id="admin-nav">
            <ul>
                <li>
                    <NavLink to={"/admin/products"}>Produkter</NavLink>
                </li>

                <li>
                    <NavLink to={"/admin/orders"}>Ordrar</NavLink>
                </li>

                <li>
                    <NavLink to={"/admin/customers"}>Kunder</NavLink>
                </li>
            </ul>
        </nav>
    )
}