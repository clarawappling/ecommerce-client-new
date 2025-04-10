import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { Product } from "../models/Product";
import { useProduct } from "../hooks/useProduct";
import "../styles/ShowProducts.css"
import "../styles/ProductDetails.css"
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";
import { Spinner } from "../components/Spinner";

export const ProductDetails = () => {
    
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const {fetchProductByIdHandler, error, isLoading} = useProduct();
    const {dispatch} = useContext(CartContext);
    const [saldo, setSaldo] = useState<string | null >(null)


    useEffect(() => {
        if (!params.id) return;
        const idAsNumber = +params.id;
        fetchProductByIdHandler(idAsNumber).then((data) => {
            setProduct(data);
  
            if (data.stock === 0) {
                setSaldo("Slutsåld");
            } else if (data.stock < 10) {
                setSaldo("Fåtal kvar i lager");
            } else {
                setSaldo("Stort antal i lager");
            }
        });
    }, [params.id]);

    const handleAddToCart = (product: Product, quantity: number) => {
        dispatch({
            type: CartActionType.ADD_ITEM,
            payload: new CartItem(product, quantity)
        })
    }
 
    if(error) return <p>{error}</p>
    
    return (
        <>
        {isLoading ? <Spinner /> : (
                    <div className="product-customer-item" id="product-customer-item" key={product?.id}>
                            <h2 className="product-name">{product?.name}</h2>
                            <img className="product-image" id="product-image" src={product?.image} />
                            <p className="product-price">{product?.price} SEK</p>
                            <p className="product-description">{product?.description}</p>
                            <i>Kategori: {product?.category}</i>
                            <p>{saldo}</p>
                         
                         { saldo !== "Slutsåld" && (
                             <button 
                            onClick={() => { if (product) {handleAddToCart(product, 1)}}}
                            disabled={!product}>
                            Lägg i varukorg
                            </button>
                         )}  
                    </div>
            )}            
        </>
    )
}