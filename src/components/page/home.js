import react from "react";
import PlayerHistoryView from "../views/playerHistoryView";
import { useParams } from "react-router-dom";

const Home = () => {
    let params = useParams();
    
    return (
        <div>
            <div id="homeBanner"> 
                <h1>Rune Rivals</h1>
            </div>
           <PlayerHistoryView />
        </div>
    )
}

export default Home;