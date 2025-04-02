import { useNavigate } from "react-router"
import { useCustomer } from "../hooks/useCustomer";
import { useEffect } from "react";
import "../styles/ManageCustomers.css"

export const ManageCustomers = () => {
    
    const navigate = useNavigate();
    const {customers, getAllCustomersHandler, deleteCustomerHandler, error, isLoading} = useCustomer();

useEffect(() => {
    getAllCustomersHandler();
}, [])
    
const handleClick = (id: number) => {
    navigate("/admin/update-customer/"+id);
}

const handleCreate = () => {
    navigate("/admin/create-customer");
}

if(isLoading) return <span className="loader"></span>
if(error) return <p>{error}</p>
    
    return (
        <>
        <div>
            <h1>Kundregister</h1>
            
            <div className="customer-table">
            <button className= "happy-btn" onClick={handleCreate}>Lägg till ny kund</button>
                <table>
                <tr>

                    <th>Kundnummer</th>
                    <th>Namn</th>
                    <th>E-mail</th>
                    <th>Telefonnummer</th>
                    <th>Uppdatera</th>
                    <th>Ta bort</th>
                </tr>
                {
                    customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstname} {customer.lastname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td><button className="neutral-btn" onClick={() => {handleClick(customer.id)}}>Uppdatera kundinformation</button></td>
                            <td><button className="alert-btn" onClick={() => {deleteCustomerHandler(customer.id)}}>Ta bort</button></td>
                        </tr>
                    )
                    )
                } 
                </table>
            </div>
         
        </div>
        </>
    )
}