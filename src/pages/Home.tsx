import "../styles/Home.css"
import bobhund from "../assets/bobhundoriginal.jpg"
import { useState } from "react";
import { Spinner } from "../components/Spinner";

export const Home = () => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    return (
        <>
        <div>
        <h1 className="h1-fun">BOB HUND FOREVER</h1>
            <div className="img-container">
                {!isImageLoaded && (<Spinner />)}
                <img 
                src={bobhund}
                onLoad={() => setIsImageLoaded(true)}/>
            </div>
            <h1 className="h1-fun">- THE STORE</h1>
        </div>
        
        </>
    )
}