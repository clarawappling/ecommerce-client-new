import { useContext, useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ShowProducts.css"
import { useNavigate } from "react-router";
import CartContext from "../contexts/CartContext";
import { Product } from "../models/Product";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";
import { Spinner } from "../components/Spinner";

export const ShowProducts = () => {
   
   const {products, fetchProductsHandler, error, isLoading} = useProduct();
   const navigate = useNavigate();
   const {dispatch} = useContext(CartContext);
    
     useEffect (() => {
           fetchProductsHandler();
       }, [])

    const handleClick =(id: number) => {
        navigate("/product/" + id)
       }

    const handleAddToCart = (product: Product, quantity: number) => {
               dispatch({
                   type: CartActionType.ADD_ITEM,
                   payload: new CartItem(product, quantity)
               })
           }
    
           const getTruncatedText = (text: string, maxLength: number) => {    
            if (text.length > maxLength) {
                return `${text.slice(0, maxLength)}...`;
            }
            return text;
           }


       if(error) return <p>{error}</p>

   return (
        <>
        
        <div className="product-container-wrapper">
            <h1>Sortiment</h1>
            {isLoading ? (<Spinner/>) : (
            <div className="product-customer-list">
                {
                    products.map((product) => (
                        <div className="product-customer-item" key={product.id}>
                            <img className="product-image" src={product.image} onClick={() => handleClick(product.id)}/>
                            <p className="product-name " onClick={() => handleClick(product.id)}>{getTruncatedText(product.name, 50)}</p>
                            <p className="product-description">{getTruncatedText(product.description, 150)}</p>
                            <p className="product-price">{product.price} SEK</p>
                            <br></br>
                            {product.stock !== 0 ?
                            <button onClick={() => handleAddToCart(product, 1)}>Lägg i varukorg</button>
                            : <p>Slutsåld</p>
                        }
                        </div>
                    )
                    )
                }
            </div> )}
        </div> 
        </>
    )
}