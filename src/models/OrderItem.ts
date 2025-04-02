export type OrderItem = {
    id: number,
	product_id: number,
	product_name: string,
	quantity: number,
	unit_price: number
}

export type OrderItemUpdate = Pick <OrderItem, 'quantity'>

export type OrderItemCreate = Omit <OrderItem, 'id' >
