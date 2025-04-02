import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useOrder } from "../hooks/useOrder";
import { DetailedOrder } from "../models/Order";
import "../styles/OrderDetails.css";
import { useOrderItem } from "../hooks/useOrderItem";
import { formatDate } from "../utils/formatDate";

export const OrderDetails = () => {
    
    const params = useParams();
    const navigate = useNavigate()
    const { fetchOrderByIdHandler, isLoading: orderIsLoading, error: orderError } = useOrder();
    const { deleteOrderItemHandler, isLoading: orderItemIsLoading, error: orderItemError } = useOrderItem();
    const [order, setOrder] = useState<DetailedOrder | null>(null);

    useEffect(() => {
      if(!params.id) return;
      const idAsNumber = +params.id;
      fetchOrderByIdHandler(idAsNumber).then((data) => setOrder(data))
    }, [])


    const handleClick = (id: number, quantity: number, product_name: string) => {
      navigate("/admin/update-order-item/" + id + "/" + quantity + "/" + product_name)
    }

    const isLoading = orderIsLoading || orderItemIsLoading;
    const error = orderError || orderItemError;
    
    if(isLoading) return <span className="loader"></span>
    if(error) return <p>{error}</p>

    return (
        <>
        <h2>Detaljerad orderinformation</h2>
        <h3>Kundinformation</h3>
        <p>{order?.customer_firstname} {order?.customer_lastname}</p>
        <p>{order?.customer_email}</p>
        <p>{order?.customer_phone}</p>
        <i>{order?.customer_street_address}, </i>
        <i>{order?.customer_city}</i>
        <br></br><br></br>
        <h3>Orderdetaljer</h3>
        <p>Orderdatum: {order ? formatDate(order.created_at) : ""}</p>
        <p>Orderstatus: {order?.order_status === "pending" ? "pågående" : "slutförd"}</p>
        <p>Betalning: {order?.payment_status === "paid" ? "genomförd" : "ej betalt"}</p>
        <p>Summa: {order?.total_price} SEK</p>
        <br></br>
        <div className="order-items-container">
        <h2>Produkter</h2>
        {order?.order_items.map((item) => {
          return (
            <div className="order-item" key={item.id}>
              <h4>{item.product_name}</h4>
              <p>Antal beställda: {item.quantity}</p>
              <p>À pris: {item.unit_price} SEK</p>
              <button className="alert-btn"onClick={() => deleteOrderItemHandler(item.id)}>Ta bort</button>
              <button className="neutral-btn"onClick={() => {handleClick(item.id, item.quantity, item.product_name)}}>Ändra antal</button>
            </div>
          )
        })} </div>
        </>
    )
}