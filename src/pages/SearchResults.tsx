import axios from "axios";
import { useEffect, useState } from "react"
import { APIResponse, IItem } from "../models/IItem";
import { useParams } from "react-router";


export const SearchResults = () => {
    const [items, setItems] = useState<IItem[] | null>(null);
    const [error, setError] = useState<string>("");
    const params = useParams();
    

   useEffect (() => {
    const showSearchResult = async () => {
        setError('')
        if (!params.searchText) return;
        const searchTerm = params.searchText;
        try {
            const response = await axios.get <APIResponse> ('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchTerm,
                    key: 'AIzaSyAZF8aD_9Nv1Li6rkqb2GYqVEOhpYtUS2k',
                    cx: 'b62c9d26f9e65496e'
                }
            });
    
            if (searchTerm.length <= 2) {
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
       }
    showSearchResult()
    }, [params.searchText])
 
   
    if(error) return <p>{error}</p>
    return (
        <>
        <div className="result-container">
        {items && items.map((item) => (
                
                <div key={item.link} className="search-result-item">
                {item.pagemap.cse_thumbnail && 
                <img src={item.pagemap.cse_thumbnail[0].src}/>}
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
                </div>
                
            
        ))}
        </div>
        </>
    )
}