import axios from "axios";
import { useEffect, useState } from "react"
import { APIResponse, IItem } from "../models/IItem";


export const SearchResults = () => {
    const [items, setItems] = useState<IItem[] | null>(null);
    const [error, setError] = useState<string>("");

   useEffect (() => {
    
    const showSearchResult = async () => {

        try {
            const response = await axios.get <APIResponse> ('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchText,
                    key: 'AIzaSyAZF8aD_9Nv1Li6rkqb2GYqVEOhpYtUS2k',
                    cx: 'b62c9d26f9e65496e'
                }
            });
            console.log(response.data);
    
            if (searchText.length <= 2) {
                throw new Error('A search query must consist of at least 3 characters')
              }
              if(response.data.items === undefined) {
                throw new Error('No results matched your query')
              }
    
              setItems(response.data.items)
    
    
        } catch(error: unknown) {
        
            if(error instanceof Error) {
                setError(error.message)
                console.log(error);
              } }
       }})
 
    
    return (
        <>
        <h1>Sida för sökresultat</h1>
        {items && items.map((item) => (
                <>
                <p>{item.title}</p>
                </>
            
        ))}
        </>
    )
}