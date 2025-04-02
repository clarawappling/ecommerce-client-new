import axios from "axios";
import { OrderItemUpdate } from "../models/OrderItem";

const ORDER_ITEM_URL = "https://ecommerce-api-new.vercel.app/order-items/"


// DELETE ORDER ITEM
export const deleteOrderItem = async (id: number) => {
    try {
        await axios.delete(ORDER_ITEM_URL + id)
    } catch(error) {
        console.log(error)
        throw error;
    }
}

// UPDATE ORDER ITEM
export const updateOrderItem = async (id: number, payload: OrderItemUpdate) => {
    try {
        await axios.patch(ORDER_ITEM_URL + id, payload)
    } catch(error) {
        console.log(error)
        throw error;
    }
}