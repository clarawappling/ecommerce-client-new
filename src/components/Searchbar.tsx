import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";

export const Searchbar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate("/search-results");
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