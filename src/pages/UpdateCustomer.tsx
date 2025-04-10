import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Customer } from "../models/Customer"
import { useNavigate, useParams } from "react-router";
import { useCustomer } from "../hooks/useCustomer";
import "../styles/UpdateCustomer.css"

export const UpdateCustomer = () => {

    const [customer, setCustomer] = useState<Customer | null>(null);
    const params = useParams();
    const {isLoading, error, getCustomerByIdHandler, updateCustomerHandler} = useCustomer();
    const navigate = useNavigate();

    useEffect(() => {
        if(!params.id) return;
        const idAsNumber = +params.id;
        getCustomerByIdHandler(idAsNumber).then((data) => setCustomer(data));
    }, [])

    const handleChange= (e: ChangeEvent<HTMLInputElement>) => {
        if(!customer) return;
        const {name, value} = e.target
        setCustomer({...customer, [name]: value})
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!customer) return;
        await updateCustomerHandler(customer.id, {
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phone: customer.phone,
            street_address: customer.street_address,
            postal_code: customer.postal_code,
            city: customer.city,
            country: customer.country,
        });
        navigate("/admin/customers");
     }
           
     const handleClick = () => {
        navigate("/admin/customers");
     }

     if(isLoading) return <><span className="loader"></span><p>Laddar...</p></> 
     if(error) return <p>{error}</p>

    return (
        <>
        <div className="customer-container">
            <h2>Uppdatera kundinformation</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Förnamn: </label>
                <input
                    name="firstname"
                    id="firstname"
                    value={customer?.firstname ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="lastname">Efternamn: </label>
                <input
                    name="lastname"
                    id="lastname"
                    value={customer?.lastname ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="email">E-mail: </label>
                <input
                    name="email"
                    id="email"
                    value={customer?.email ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="phone">Telefonnummer: </label>
                <input
                    name="phone"
                    id="phone"
                    value={customer?.phone ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="street_address">Gatuadress: </label>
                <input
                    name="street_address"
                    id="street_address"
                    value={customer?.street_address ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="postal_code">Postkod: </label>
                <input
                    name="postal_code"
                    id="postal_code"
                    value={customer?.postal_code ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                <label htmlFor="city">Ort: </label>
                  <input
                    name="city"
                    id="city"
                    value={customer?.city ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                   <label htmlFor="country">Land: </label>
                <input
                    name="country"
                    id="country"
                    value={customer?.country ?? ''}
                    onChange={(e) => {handleChange(e)}}
                />
                <button>Uppdatera</button>
            </form>
            <br></br>
            <button onClick={handleClick}>Avbryt</button>
        </div>
        </>
    )
}