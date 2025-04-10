import {  useEffect } from "react"
import { useOrder } from "../hooks/useOrder"
import "../styles/ManageOrders.css"
import { Link, useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import "../styles/ManageOrders.css"

export const ManageOrders = () => {

    const navigate = useNavigate();
    const {error, isLoading, orders, fetchOrdersHandler, deleteOrderHandler} = useOrder();

    useEffect(() => {
        fetchOrdersHandler();
    }, []);

    const handleClick = (id: number) => {
        navigate("/admin/update-order-status/" + id);
    }

    if(isLoading) return <><span className="loader"></span><p>Laddar...</p></> 
    if(error) return <p>{error}</p>

    return (
        <>
            <div>
                <h1>Orderlista</h1>
                <div className="order-container">
                    <table>
                        <tr>
                            <th>Order-nr</th>
                            <th>Kundnamn</th>
                            <th>Orderdatum</th>
                            <th>Summa</th>
                            <th>Status</th>
                            <th>Uppdatera status</th>
                            <th>Ta bort</th>
                            
                        </tr>
                    {
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td><Link className="order-link" to={`/admin/detailed-order/${order.id}`}>{order.id}</Link></td>
                                <td>{order.customer_firstname} {order.customer_lastname}</td> 
                                <td>{formatDate(order.created_at)}</td>
                                <td>{order.total_price} SEK</td>
                                <td>{order.order_status === "complete" ? "slutförd" : "pågående"}</td> 
                                <td><button className="neutral-btn" onClick={() => {handleClick(order.id)}}>Ändra orderstatus</button></td>
                                <td><button className="alert-btn" onClick={() => {deleteOrderHandler(order.id)}}>Ta bort</button></td>
                            </tr>
                        ))
                    }
                    </table>
                </div>
            </div>
        </>
    )
}

