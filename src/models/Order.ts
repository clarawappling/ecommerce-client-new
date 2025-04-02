import { OrderItemCreate } from "./OrderItem"

export type Order = {
    id: number,
	customer_id: number,
	total_price: number,
	payment_status: string,
	payment_id: string,
	order_status: string,
	created_at: string,
	customer_firstname: string,
	customer_lastname: string,
	customer_email: string,
	customer_phone: string,
	customer_street_address: string,
	customer_postal_code: string,
	customer_city: string,
	customer_country: string,
	customers_created_at: string
}

export type OrderStatusUpdate = Pick <Order, 'order_status' | 'payment_status' | 'payment_id'>

export interface DetailedOrder extends Order {
	order_items: [
		{
			id: number,
			product_id: number,
			product_name: string,
			quantity: number,
			unit_price: number
		}
	]
}

export type OrderCreate = {
	customer_id: number,
	payment_status: string,
	payment_id: string,
	order_status: string,
	order_items: OrderItemCreate[]
}


