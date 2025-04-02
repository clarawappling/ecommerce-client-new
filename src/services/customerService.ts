import axios from "axios";
import { Customer, CustomerCreate, CustomerUpdate } from "../models/Customer";
import { CustomerCreateResponse } from "../models/CustomerCreateReponse";


const CUSTOMERS_URL = "https://ecommerce-api-8zdx596q0-clara-wapplings-projects.vercel.app/customers"

// GET ALL CUSTOMERS
export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await axios.get(CUSTOMERS_URL);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// GET CUSTOMER BY ID
export const getCustomerById = async (id: number): Promise<Customer> => {
    try {
        const response = axios.get(`${CUSTOMERS_URL}/${id}`);
        return (await response).data;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

// GET CUSTOMER BY EMAIL
export const getCustomerByEmail = async (email: string): Promise<Customer> => {
    try {
        const response = axios.get(`${CUSTOMERS_URL}/email/${email}`);
        return (await response).data;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

// CREATE CUSTOMER
export const createCustomer = async (payload: CustomerCreate): Promise<CustomerCreateResponse> => {
    try {
        const response = await axios.post(CUSTOMERS_URL, payload);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// UPDATE CUSTOMER
export const updateCustomer = async (id: number, payload: CustomerUpdate) => {
    try {
        await axios.patch(`${CUSTOMERS_URL}/${id}`, payload);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// DELETE CUSTOMER
export const deleteCustomer = async (id: number) => {
    try {
        await axios.delete(`${CUSTOMERS_URL}/${id}`);
    } catch(error) {
        console.log(error);
        throw error;
    }
}