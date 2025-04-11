import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import CartContext from "../contexts/CartContext";
import { CustomerCreate } from "../models/Customer";
import { useCustomer } from "../hooks/useCustomer";
import { OrderCreate } from "../models/Order";
import { useOrder } from "../hooks/useOrder";
import axios from "axios";
import { StripeOrder } from "../models/StripeOrder";
import { Spinner } from '../components/Spinner';


const stripePromise = loadStripe('pk_test_51R4JflEUcfJR78A9I4729RJfcSNRKqB9njUYAcAAmJTLHAsbn8xWDNaakNUUyvbP2dHDE0UisUraA1GgHnwmmg1F00aCscjeAl')

export const Checkout = () => {

  const {cart} = React.useContext(CartContext)
  const {getCustomerByEmailHandler, createCustomerHandler} = useCustomer();
  const {createOrderHandler, isLoading, error} = useOrder();
  const [loading, setLoading] = React.useState<boolean>(false);
  
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [customer, setCustomer] = React.useState<CustomerCreate>(() => {
    const savedCustomer = localStorage.getItem('customer');
    return savedCustomer ? JSON.parse(savedCustomer) :
    {
        firstname: "", 
        lastname: "", 
        phone: "", 
        email: "",  
        postal_code: "", 
        country: "", 
        city: "", 
        street_address: ""}})

    
// Stripe integration

    const fetchClientSecret = React.useCallback(async (payload: StripeOrder) => {
      setLoading(true)
      console.log(payload)
      try {
        const response = await axios.post('https://ecommerce-api-new.vercel.app/stripe/create-checkout-session-embedded', payload) 
        return response.data.clientSecret;
      } catch (error) {
        console.error("Error fetching client secret:", error);
        throw error; 
      } finally {
        setLoading(false)
      }
    }, []);

// Handle customer form changes
     const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
            if(!customer) return;
            const {name, value} = e.target
            setCustomer({...customer, [name]: value})
        }

// Handle sumbit 
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if(!customer) return;
          localStorage.setItem('customer', JSON.stringify(customer))

          try {
            const response = await getCustomerByEmailHandler(customer.email);
            const customerId = response.id;
            console.log("Existing Customer ID:", customerId);
        
            const order: OrderCreate = {
              customer_id: customerId,
              payment_status: "unpaid",
              payment_id: "",
              order_status: "pending",
              order_items: cart.map((item) => {
                return (
                  {product_id: item.product.id,
                    product_name: item.product.name,
                    quantity: item.quantity,
                    unit_price: item.product.price
                  }
                )
              })
            };
        
        const orderId = await createOrderHandler(order);
        const fetchedClientSecret = await fetchClientSecret ({order_items: order.order_items, order_id: orderId})
        setClientSecret(fetchedClientSecret)
        return clientSecret;
        
        } catch {
            const response = await createCustomerHandler(customer)
            const customerId = response.id;
            console.log("New Customer ID:", customerId);
        
            const order: OrderCreate = {
              customer_id: customerId,
              payment_status: "unpaid",
              payment_id: "",
              order_status: "pending",
              order_items: cart.map((item) => {
                return (
                  {product_id: item.product.id,
                    product_name: item.product.name,
                    quantity: item.quantity,
                    unit_price: item.product.price
                  }
                )
              })
            };
      
            const orderId = await createOrderHandler(order);
            const fetchedClientSecret = await fetchClientSecret ({order_items: order.order_items, order_id: orderId})
            setClientSecret(fetchedClientSecret)
            return clientSecret;
              } 
            }

            if(error) return <p>{error}</p>

            return (
              <>
                {cart.length > 0 && (
                  <>
                    {isLoading || loading ? (
                      <Spinner />
                    ) : !clientSecret ? (
                      <div className="customer-container">
                        <h2>Kundens information</h2>
                        <form onSubmit={handleSubmit}>
                          <label htmlFor="firstname">Förnamn: </label>
                          <input
                            name="firstname"
                            id="firstname"
                            value={customer?.firstname ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="lastname">Efternamn: </label>
                          <input
                            name="lastname"
                            id="lastname"
                            value={customer?.lastname ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="email">E-mail: </label>
                          <input
                            name="email"
                            id="email"
                            value={customer?.email ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="phone">Telefonnummer: </label>
                          <input
                            name="phone"
                            id="phone"
                            value={customer?.phone ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="street_address">Gatuadress: </label>
                          <input
                            name="street_address"
                            id="street_address"
                            value={customer?.street_address ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="postal_code">Postkod: </label>
                          <input
                            name="postal_code"
                            id="postal_code"
                            value={customer?.postal_code ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="city">Ort: </label>
                          <input
                            name="city"
                            id="city"
                            value={customer?.city ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="country">Land: </label>
                          <input
                            name="country"
                            id="country"
                            value={customer?.country ?? ''}
                            onChange={handleChange}
                            required
                          />
                          <button>Spara uppgifter och gå till betalning</button>
                        </form>
                      </div>
                    ) : (
                      <div id="stripe-container">
                        <EmbeddedCheckoutProvider
                          stripe={stripePromise}
                          options={{ clientSecret }}
                        >
                          <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                      </div>
                    )}
                  </>
                )}
              </>
            );
}