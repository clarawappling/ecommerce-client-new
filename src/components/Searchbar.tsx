import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";
import { APIResponse, IItem } from "../models/IItem";
import axios from "axios";

export const Searchbar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [items, setItems] = useState<IItem[] | null>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.get <APIResponse> ('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchText,
                    key: 'AIzaSyAZF8aD_9Nv1Li6rkqb2GYqVEOhpYtUS2k',
                    cx: 'b62c9d26f9e65496e'
                }
            });
            console.log(response.data);


        } catch {

        }
        
        
        navigate("/search-results"); 
        // Och någon mer parameter att skicka ned med useparams
        setSearchText("");

    }

    
    return (
        <>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={searchText}
        onChange={(e) => {setSearchText(e.target.value)}}/>
        <button>Sök produkt</button>
        </form>
        </>
    )
}