import "../styles/Home.css"
import bobhund from "../assets/bobhundoriginal.jpg"

export const Home = () => {
    
    return (
        <>
        <div>
            
            <div className="img-container">
                <img src={bobhund}/>
                <h1>BOB HUND FOREVER - THE STORE</h1>
            </div>
        </div>
        
        </>
    )
}