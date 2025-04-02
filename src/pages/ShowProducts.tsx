import { useContext, useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ShowProducts.css"
import { useNavigate } from "react-router";
import CartContext from "../contexts/CartContext";
import { Product } from "../models/Product";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";

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
   
       if(isLoading) return <span className="loader"></span>
       if(error) return <p>{error}</p>

   return (
        <>
        
        <div className="product-container-wrapper">
            <h1>Sortiment</h1>
           
            <div className="product-customer-list">
                {
                    products.map((product) => (
                        <div className="product-customer-item" key={product.id}>
                            <img className="product-image" src={product.image} onClick={() => handleClick(product.id)}/>
                            <p className="product-name " onClick={() => handleClick(product.id)}>{product.name}</p>
                            <p className="product-description">{product.description}</p>
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
            </div>
        </div>
        </>
    )
}