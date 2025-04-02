import { useState } from "react";
import { OrderItemUpdate } from "../models/OrderItem";
import { deleteOrderItem, updateOrderItem } from "../services/orderItemService";

export const useOrderItem = () => {

const [error, setError] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false)

const deleteOrderItemHandler = async (id: number) => {
    setIsLoading(true)
    try {
        await deleteOrderItem(id);
    } catch (error) {
        setError("Couldn't delete order item")
        throw error;
    } finally {
        setIsLoading(false)
    }
}

const updateOrderItemHandler = async (id: number, payload: OrderItemUpdate) => {
    setIsLoading(true)
    try {
        await updateOrderItem(id, payload);
    } catch (error) {
        setError("Couldn't update order item")
        throw error;
    } finally {
        setIsLoading(false)
    }
}
    return {
        deleteOrderItemHandler,
        updateOrderItemHandler,
        error,
        isLoading
    }
}