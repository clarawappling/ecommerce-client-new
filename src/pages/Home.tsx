import "../styles/Home.css"
import bobhund from "../assets/bobhundoriginal.jpg"

export const Home = () => {
    
    return (
        <>
        <div>
        <h1 className="h1-fun">BOB HUND FOREVER - THE STORE</h1>
            <div className="img-container">
                <img src={bobhund}/>
            </div>
        </div>
        
        </>
    )
}