import axios from "axios";
import { useEffect, useState } from "react"
import { APIResponse, IItem } from "../models/IItem";
import { useParams } from "react-router";
import { URLListItem } from "../models/URLList";


export const SearchResults = () => {
    const [filteredResults, setFilteredResults] = useState<IItem[] | null>(null)
    const [error, setError] = useState<string>("");
    const params = useParams();
    const URLmapping: URLListItem[] = [
       
        {URL:"https://www.adlibris.com/se/produkt/veke-vaxad-11-cm-10-st-creativ-company-46914841", id: 3},
        {URL: "https://www.adlibris.com/se/produkt/ljuspennor-svart-gron-ljusgra-rod-30-ml-4-pack-57139460", id: 4},
        {URL: "https://www.adlibris.com/se/produkt/ljuspennor-ljusbla-ljusrosa-lila-gul-30-ml-4-pack-57139461", id: 5},
        {URL: "https://www.adlibris.com/se/produkt/sojavax-for-ljustillverkning-ljus-i-behallare-500g-57139475", id: 6},
        {URL: "https://www.adlibris.com/se/produkt/ljusveke---veke-till-stearin-80-m-23423390", id: 7},
        {URL: "https://www.adlibris.com/se/produkt/rent-paraffinvax-1-kg-39612849", id: 8 },
        {URL: "https://www.adlibris.com/se/produkt/sojavax-for-ljustillverkning-fristaende-ljus-500g-57139472", id: 9 },
        {URL: "https://www.adlibris.com/se/produkt/sojavax-for-ljustillverkning-1-kg-56004144", id: 10 },

    ]
    

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

              const resultItems = response.data.items
              const filteredResult = resultItems.filter(item => 
                URLmapping.find(urlMapping => urlMapping.URL === item.link )
              );
              setFilteredResults(filteredResult)

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
        {filteredResults && filteredResults.map((item) => (
                <div key={item.link} className="search-result-item">
                {item.pagemap.cse_thumbnail && 
                <img src={item.pagemap.cse_thumbnail[0].src}/>}
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
                <p>{item.link}</p>
                </div>
        ))}
        </div>
        </>
    )
}