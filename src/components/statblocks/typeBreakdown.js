import react from "react";
import landmarksPNG from "../../static/landmarks.png";
import unitsPNG from "../../static/units.png";
import spellsPNG from "../../static/spells.png";
import "./typeBreakdown.css";

const TypeBreakdown = ({ chartData, dispatch }) => {
    let data ={
        units: 0,
        spells: 0,
        landmarks: 0
    }

    for(let factionRef in chartData){
      data.landmarks += chartData[factionRef].landmarks;   
      data.units += chartData[factionRef].units.count;
      data.spells += chartData[factionRef].spells.count;
    }


    return(
        <div id="typeBreakdown" className="breakdown">
            <div>
                <div className="number">{data.units}</div>
                <div><button className="btn--hide" onClick={() => dispatch({ type:"filter-by-type", payload:"Unit"})}><img src={unitsPNG} /></button></div>
                
            </div>
            <div>
                <div className="number">{data.spells}</div>
                <div><button className="btn--hide" onClick={() => dispatch({ type:"filter-by-type", payload:"Spell"})}><img src={spellsPNG} /></button></div>
                
            </div>
            <div>
                <div className="number">{data.landmarks}</div>
                <div><button className="btn--hide" onClick={() => dispatch({ type:"filter-by-type", payload:"Landmark"})}> <img src={landmarksPNG} /></button></div>
            </div>
        </div>
    )
}

export default TypeBreakdown;