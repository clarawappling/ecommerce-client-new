import axios from "axios";
import { useEffect, useState } from "react"
import { APIResponse, IItem } from "../models/IItem";
import { useNavigate, useParams } from "react-router";
import { URLmapping } from "../constants/URLMapping";
import "../styles/SearchResults.css"
import { Spinner } from "../components/Spinner";

export const SearchResults = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const dbId = import.meta.env.VITE_DB_ID;    
    
    const [filteredResults, setFilteredResults] = useState<IItem[] | null>(null)
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState <boolean>(false)
    const params = useParams();
    const navigate = useNavigate();

   useEffect (() => {
    const showSearchResult = async () => {
        setIsLoading(true)
        setError('')
        if (!params.searchText) return;
        const searchTerm = params.searchText;
        try {
            const response = await axios.get <APIResponse> ('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchTerm,
                    key: apiKey, 
                    cx: dbId
                }
            });
    
            if (searchTerm.length <= 2) {
                throw new Error('A search query must consist of at least 3 characters')
              }
              if(response.data.items === undefined) {
                throw new Error('No results matched your query')
              }

              const resultItems = response.data.items
              console.log(response.data)
              const filteredResult = resultItems.filter(item => 
                URLmapping.find(urlMapping => urlMapping.URL === item.link )
              );
              setFilteredResults(filteredResult)

        } catch(error: unknown) {
        
            if(error instanceof Error) {
                setError(error.message)
                console.log(error);
              } 
        } finally {
            setIsLoading(false)
        }
        
       }
    showSearchResult()
    }, [params.searchText])
 

    const handleClick = (itemLink: string) => {
        const specificProduct = URLmapping.find(urlmapping => urlmapping.URL === itemLink)
        if(specificProduct)
        navigate("/product/" + specificProduct.id)
    }
   
    if(error) return <p>{error}</p>
    if(filteredResults?.length === 0) return <p>Din sökning är för generell, försök skriva mer specifika sökord och pröva igen!</p>

    return (
        <>
        <h1>Sökresultat</h1>
        {isLoading ? <Spinner/> : (
        <div className="result-container">
        {filteredResults && filteredResults.map((item) => (
                <div key={item.link} className="search-result-item">
                {item.pagemap.cse_thumbnail && 
                <img src={item.pagemap.cse_thumbnail[0].src} onClick={() => handleClick(item.link)}/>}
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
                </div>
        ))}
        </div>
        )}
        </>
    )
}