import react from "react";

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
        <div className="someFlex">
            <div>
                <div><button onClick={() => dispatch({ type:"filter-by-type", payload:"Unit"})}>Units</button></div>
                <div>{data.units}</div>
            </div>
            <div>
                <div><button onClick={() => dispatch({ type:"filter-by-type", payload:"Spell"})}>Spells</button></div>
                <div>{data.spells}</div>
            </div>
            <div>
                <div><button onClick={() => dispatch({ type:"filter-by-type", payload:"Landmark"})}>Landmark</button></div>
                <div>{data.landmarks}</div>
            </div>
        </div>
    )
}

export default TypeBreakdown;