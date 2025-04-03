import { ChangeEvent, FormEvent, useState } from "react"
import { ProductCreate } from "../models/Product"
import { useProduct } from "../hooks/useProduct"
import { useNavigate } from "react-router"

export const CreateProduct = () => {
    
    const [product, setProduct] = useState<ProductCreate>({name:"", description:"", price:0, stock:0, category:"", image:""})
    const {isLoading, error, createProductHandler} = useProduct()
    const navigate = useNavigate()
    

    const handleChange= (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {type, name, value} = e.target;
    
        if(type === "number") {
            setProduct({...product, [name]: +value})
        } else {
            setProduct({...product, [name]: value})
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createProductHandler ({
            name: product.name, 
            description: product.description,
            stock: product.stock,
            price: product.price,
            category: product.category,
            image: product.image
        });
        navigate("/admin/products");
    }

    const handleClick = () => {
        navigate("/admin/products");
    }

    if(isLoading) return <span className="loader"></span>
    if(error) return <p>{error}</p>

    return (
        <>
        
        <div className="product-container">
                <h2>Lägg till produkt</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Namn:</label>
                <input
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={(e) => {handleChange(e)}}
                    required
                  />
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={(e) => {handleChange(e)}}
                    required
                  />
                  <label htmlFor="price">Pris:</label>
                  <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={(e) => {handleChange(e)}}
                  required

                  />
                  <label htmlFor="stock">I lager:</label>
                  <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={product.stock}
                  onChange={(e) => {handleChange(e)}}
                  required

                  />
                  <label htmlFor="image">Bildlänk:</label>
                  <input
                    name="image"
                    id="image"
                    value={product.image}
                    onChange={(e) => {handleChange(e)}}
                    required
                    />
                   <label htmlFor="category">Välj kategori:</label>
                        <select id="category" name="category" value={product.category} onChange={handleChange}>
                        <option value="Vax">Vax</option>
                        <option value="">--</option>
                            <option value="Vekar">Vekar</option>
                            <option value="Färger">Färger</option>
                            <option value="Gjutformar">Gjutformar</option>
                            <option value="Ljuspennor">Ljuspennor</option>
                            <option value="Övrigt">Övriga leksaker</option>
                        </select>
                        <button>Lägg till produkt</button>
                </form>
                <br></br>
                <button onClick={handleClick}>Avbryt</button>
            </div>
        </>
    )
}