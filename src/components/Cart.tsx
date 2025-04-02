import { useContext } from "react"
import CartContext from "../contexts/CartContext"
import { CartActionType } from "../reducers/CartReducer"
import "../styles/Cart.css"
import { Product } from "../models/Product"
import { CartItem } from "../models/CartItem"

export const Cart = () => {

    const {cart, dispatch} = useContext(CartContext);

    const handleChangeQuantity = (product: Product, quantity: number) => {
        dispatch({
            type: CartActionType.CHANGE_QUANTITY,
            payload: new CartItem(product, quantity)
        })}

        const handleRemoveFromCart = (cartItem: CartItem) => {
            dispatch({
                type: CartActionType.REMOVE_ITEM,
                payload: cartItem
            })
        }

    const totalPrice = cart.reduce( (total, item: CartItem) => (
        total + (item.quantity * item.product.price )
    ), 0 )

    return (
    <>
        <div className="cart-container">
            <ul className="cart-list">
                {cart.map((item) => (
       
                    <li key={item.product.id}>
                        <div className="cart-item">
                            <h3>{item.product.name}</h3>
                                <div>
                                    <img src={item.product.image}/>
                                </div>
                            <span>{item.product.price} SEK</span>
                            <span className="multiplier"> x </span>
                            <span>{item.quantity}</span>
                            <div className="quantity-adjustment">
                                <button onClick={() => handleChangeQuantity(item.product, -1)}>-</button>
                                <button onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart (item)}>Ta bort</button>
                        </div>
                    </li>       
                ))}
            </ul>
            <div className="total-sum-container">
                <p>{totalPrice ? "Att betala: " + totalPrice + " SEK" :  "Du har inga varor i din varukorg. Och vet du? Det är inte så dumt."}</p>
            </div>
        </div>
    </>
)
}