// import axios from "axios";
// import { useEffect, useState } from "react";
// import { APIResponse, IItem } from "../models/IItem";
// import { useNavigate, useParams } from "react-router";
// import { URLmapping } from "../constants/URLMapping";
// import "../styles/SearchResults.css";
// import { Spinner } from "../components/Spinner";

// export const SearchResults = () => {
//   const apiKey = import.meta.env.VITE_API_KEY;
//   const dbId = import.meta.env.VITE_DB_ID;

//   const [filteredResults, setFilteredResults] = useState<IItem[] | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const showSearchResult = async () => {
//       setIsLoading(true);
//       setError("");
//       if (!params.searchText) return;
//       const searchTerm = params.searchText;

//       try {
//         let allItems: IItem[] = [];
//         let start = 1;
//         let keepFetching = true;

//         while (keepFetching) {
//           const response = await axios.get<APIResponse>(
//             "https://www.googleapis.com/customsearch/v1",
//             {
//               params: {
//                 q: searchTerm,
//                 key: apiKey,
//                 cx: dbId,
//                 start: start,
//               },
//             }
//           );

//           if (response.status === 429) {
//             throw new Error(
//               "Maximalt antal sökningar gjorda för idag, kom tillbaka till sökfunktionen igen någon gång imorgon!"
//             );
//           }

//           const items = response.data.items || [];
//           allItems = [...allItems, ...items];
     
//           const nextPage = response.data.queries?.nextPage;
//           if (nextPage && nextPage.length > 0) {
//             start = nextPage[0].startIndex;
//           } else {
//             keepFetching = false;
//           }
//         }

//         const filtered = allItems.filter((item) =>
//           URLmapping.find((urlMapping) => urlMapping.URL === item.link)
//         );

//         if (filtered.length === 0) {
//           throw new Error(
//             "Det finns inga produkter som matchade din sökning, prova igen med andra sökord!"
//           );
//         }
//         setFilteredResults(filtered);

//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//           console.error(error);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     showSearchResult();
//   }, [params.searchText]);

//   const handleClick = (itemLink: string) => {
//     const specificProduct = URLmapping.find(
//       (urlmapping) => urlmapping.URL === itemLink
//     );
//     if (specificProduct) navigate("/product/" + specificProduct.id);
//   };

//   if (error) return <p>{error}</p>;
//   if (filteredResults?.length === 0)
//     return (
//       <p>
//         Din sökning är för generell, försök skriva mer specifika sökord och
//         pröva igen!
//       </p>
//     );

//   return (
//     <>
//     <div>
//       <h1 className="search-results-h1">Sökresultat</h1>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <div className="result-container">
//           {filteredResults &&
//             filteredResults.map((item) => (
//               <div key={item.link} className="search-result-item">
//                 {item.pagemap?.cse_thumbnail && (
//                   <img
//                     src={item.pagemap.cse_thumbnail[0].src}
//                     alt={item.title}
//                     onClick={() => handleClick(item.link)}
//                   />
//                 )}
//                 <h3>{item.title}</h3>
//                 <p>{item.snippet}</p>
//               </div>
//             ))}
//         </div>
//       )}
//       </div>
//     </>
//   );
// };

import axios from "axios";
import { useEffect, useState } from "react";
import { APIResponse, IItem } from "../models/IItem";
import { useNavigate, useParams } from "react-router";
import { URLmapping } from "../constants/URLMapping";
import "../styles/SearchResults.css";
import { Spinner } from "../components/Spinner";

export const SearchResults = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const dbId = import.meta.env.VITE_DB_ID;

  const [filteredResults, setFilteredResults] = useState<IItem[] | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const showSearchResult = async () => {
      setIsLoading(true);
      setError("");
      if (!params.searchText) return;
      const searchTerm = params.searchText;

      try {
        let allItems: IItem[] = [];
        let start = 1;
        let keepFetching = true;

        while (keepFetching) {
          const response = await axios.get<APIResponse>(
            "https://www.googleapis.com/customsearch/v1",
            {
              params: {
                q: searchTerm,
                key: apiKey,
                cx: dbId,
                start: start,
              },
            }
          );

          const items = response.data.items || [];
          allItems = [...allItems, ...items];
     
          const nextPage = response.data.queries?.nextPage;
          if (nextPage && nextPage.length > 0) {
            start = nextPage[0].startIndex;
          } else {
            keepFetching = false;
          }
        }

        const filtered = allItems.filter((item) =>
          URLmapping.find((urlMapping) => urlMapping.URL === item.link)
        );

        if (filtered.length === 0) {
          throw new Error(
            "Det finns inga produkter som matchade din sökning, prova igen med andra sökord!"
          );
        }
        setFilteredResults(filtered);

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            setError(
              "Sökfunktionen är trött och orkar inte mer idag. Du får använda ctrl + f på 'Musik & merch'-sidan. Det fixar du!"
            );
          } else {
            setError(error.message || "Något gick fel vid hämtning av sökresultat.");
          }
          console.error(error);
        } else {
          setError("Ett okänt fel inträffade.");
        }
        
      } finally {
        setIsLoading(false);
      }
    };

    showSearchResult();
  }, [params.searchText]);

  const handleClick = (itemLink: string) => {
    const specificProduct = URLmapping.find(
      (urlmapping) => urlmapping.URL === itemLink
    );
    if (specificProduct) navigate("/product/" + specificProduct.id);
  };

  if (error) return <p>{error}</p>;
  if (filteredResults?.length === 0)
    return (
      <p>
        Din sökning är för generell, försök skriva mer specifika sökord och
        pröva igen!
      </p>
    );

  return (
    <>
    <div>
      <h1 className="search-results-h1">Sökresultat</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="result-container">
          {filteredResults &&
            filteredResults.map((item) => (
              <div key={item.link} className="search-result-item">
                {item.pagemap?.cse_thumbnail && (
                  <img
                    src={item.pagemap.cse_thumbnail[0].src}
                    alt={item.title}
                    onClick={() => handleClick(item.link)}
                  />
                )}
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
              </div>
            ))}
        </div>
      )}
      </div>
    </>
  );
};

