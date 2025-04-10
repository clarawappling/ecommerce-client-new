import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Product } from "../models/Product"
import { useNavigate, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import "../styles/UpdateProduct.css"

export const UpdateProduct = () => {
    
    const [product, setProduct] = useState<Product | null>(null);
    const params = useParams();
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        if(!params.id) return;
        const idAsNumber = +params.id;
        fetchProductByIdHandler(idAsNumber).then((data) => setProduct(data));
    }, []
)

const handleChange= (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if(!product) return;

    const {type, name, value} = e.target;
    if(type === "number") {
        setProduct({...product, [name]: +value})
    } else {
        setProduct({...product, [name]: value})
    }
}

const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    if(!product) return;

    await updateProductHandler(product.id, {
        name: product.name, 
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category,
        image: product.image
    })
    navigate("/admin/products")
}

const handleClick = () => {
    navigate("/admin/products");
 }
 if(isLoading) return <><span className="loader"></span><p>Laddar...</p></> 
 if(error) return <p>{error}</p>

    return (
        <>
            <div className="product-container">
                <h2>Uppdatera produkt</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Namn:</label>
                <input
                    name="name"
                    id="name"
                    value={product?.name ?? ''}
                    onChange={(e) => {handleChange(e)}}
                  />
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea
                    name="description"
                    id="description"
                    value={product?.description ?? ''}
                    onChange={(e) => {handleChange(e)}}
                  />
                  <label htmlFor="price">Pris:</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product?.price ?? ''}
                    onChange={(e) => {handleChange(e)}}

                  />
                  <label htmlFor="stock">I lager:</label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={product?.stock ?? ''}
                    onChange={(e) => {handleChange(e)}}

                  />
                  <label htmlFor="image">Bildlänk:</label>
                  <input
                    name="image"
                    id="image"
                    value={product?.image ?? ''}
                    onChange={(e) => {handleChange(e)}}
                    />
                   <label htmlFor="category">Välj kategori:</label>
                        <select id="category" name="category" value={product?.category ?? ''} onChange={handleChange}>
                            <option value="">--</option>
                            <option value="T-shirts">T-shirts</option>
                            <option value="Vinyl">Vinyl</option>
                            <option value="Affischer">Affischer</option>
                            <option value="Klistermärken">Klistermärken</option>
                            <option value="Konst">Konst</option>
                            <option value="Övrigt">Övrigt</option>
                        </select>
                        <button>Uppdatera</button>
                        <br></br>
                    <button onClick={handleClick}>Avbryt</button>
                </form>
            </div>
        </>
    )
}