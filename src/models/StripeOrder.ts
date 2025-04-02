import { OrderItemCreate } from "./OrderItem";

export class StripeOrder {
    constructor (
        public order_items: OrderItemCreate[],
        public order_id: number,
    ) {}
}