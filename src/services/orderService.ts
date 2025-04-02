import axios from "axios"
import { DetailedOrder, Order, OrderCreate, OrderStatusUpdate } from "../models/Order";
import { OrderCreateResponse } from "../models/OrderCreateResponse";

    const ORDERS_URL = "https://ecommerce-api-new.vercel.app/orders"
   
    // GET ALL ORDERS
    export const fetchOrders = async (): Promise<Order[]> => {
        try {
            const response = await axios.get<Order[]>(ORDERS_URL);
        return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // GET ORDER BY ORDER ID
    export const fetchOrderById = async (id: number): Promise <DetailedOrder> => {
        try {
            const response = await axios.get(`${ORDERS_URL}/${id}`);
            return response.data;
        } catch(error) {
            console.log(error)
            throw error;
        }
    }

    // GET ORDER BY PAYMENT ID
    export const fetchOrderByPaymentId = async (paymentId: string): Promise <DetailedOrder> => {
        try {
            const response = await axios.get(`${ORDERS_URL}/payment/${paymentId}`);
            return response.data;
        } catch(error) {
            console.log(error)
            throw error;
        }
    }

    // DELETE ORDER
    export const deleteOrder = async (id: number) => {
        try {
            await axios.delete(`${ORDERS_URL}/${id}`);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // UPDATE ORDER STATUS
    export const updateOrderStatus = async (id: number, payload: OrderStatusUpdate) => {
        try {
            await axios.patch(`${ORDERS_URL}/${id}`, payload)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // CREATE ORDER
    export const createOrder = async (payload: OrderCreate): Promise<OrderCreateResponse> => {
        try {
            const response = await axios.post(`${ORDERS_URL}`, payload);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // // ORDER TO STRIPE
    // export const orderToStripe = async (payload: StripeOrder) => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/stripe/create-checkout-session-embedded', payload);
    //         response
    //     } catch (error) {
    //         console.log(error);
    //         throw error;

    //     }
    // }