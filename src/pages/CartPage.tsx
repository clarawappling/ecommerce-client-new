import { useNavigate } from "react-router"
import { Cart } from "../components/Cart"
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";
import "../styles/CartPage.css"

export const CartPage = () => {

    const navigate = useNavigate();
    const {dispatch, cart} = useContext(CartContext);

    const handleEmptyCart = () => {
        dispatch ({
            type: CartActionType.RESET_CART,
            payload: null
        })
    }

    const handleClick = () => {
        navigate("/checkout")
    }

    return (
        <>
        
        <div className="cart-page-container">
        <h1>Varukorg</h1>
        <Cart/>
        {cart.length > 0 && (
                <>
                    <button className="alert-btn" onClick={handleEmptyCart}>Töm varukorg</button>
                    <button className="happy-btn" onClick={handleClick}>Till kassan</button>
                </>
            )}
            </div>
        </>
    )
}