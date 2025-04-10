import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ManageProducts.css"
import { useNavigate } from "react-router";
import { Spinner } from "../components/Spinner";



export const ManageProducts = () => {
    
    const navigate = useNavigate();
    const {products, isLoading, error, fetchProductsHandler, deleteProductHandler} = useProduct();

    useEffect (() => {
        fetchProductsHandler();
    }, [])

    const handleClick = (id: number) => {
        navigate("/admin/update-product/"+id);
    }

    const handleCreate = () => {
        navigate("/admin/create-product")
    }
    
    if(error) return <p>{error}</p>
    
    return (
<>
        <div>
            <h1>Produktlista</h1>
            {isLoading ? <Spinner /> : (
            <div className="product-container">
            <button className="happy-btn" onClick={handleCreate}>Lägg till produkt</button>
                <table>
                    <tr>
                        <th>Produkt-id</th>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Lagersaldo</th>
                        <th>Uppdatera</th>
                        <th>Ta bort</th>
                    </tr>
                {
                    products.map((product) => (
                        <tr className="product-container" key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} SEK</td>
                            <td>{product.stock} st</td>
                            <td><button className="neutral-btn" onClick={() => {handleClick(product.id)}}>Uppdatera produkt</button></td>
                            <td><button className="alert-btn"onClick={() => {deleteProductHandler(product.id)}}>Ta bort</button></td>
                        </tr>
                    )
                    )
                }
                </table>
            </div>
            )}
        </div>
        </>
    )
}