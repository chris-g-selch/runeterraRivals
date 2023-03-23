import react from "react";
import PlayerHistoryView from "../views/playerHistoryView";
import { useParams } from "react-router-dom";

const Home = () => {
    let params = useParams();
    let returnElement = <PlayerHistoryView />;
    if(params.summoner !== undefined && params.tag !== undefined){
        
        returnElement = <PlayerHistoryView summoner={params.summoner} tag={params.tag} />;
    }
    
    return (
        <>  
            <div id="homeBanner"> 
                <h1 id="homeBanner__text">Runeterra Rivals</h1>
            </div>
            <section id="main-wrapper">
                { returnElement }
            </section>
           
        </>
    )
}

export default Home;