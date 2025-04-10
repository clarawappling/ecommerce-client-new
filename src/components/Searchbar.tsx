import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";
import "../styles/Searchbar.css"

export const Searchbar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        
        if(searchText.length <=2 ) {
            setError('Din sökning måste bestå av minst 3 tecken')
            return; }

        navigate(`/search-results/${searchText}`); 
        setSearchText("");

    }
    
    return (
        <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={searchText}
        onChange={(e) => {setSearchText(e.target.value)}}/>
        <button>Go fetch!</button>
       
        </form>
    
        {error && <p>{error}</p>}
        </div>
    )
}