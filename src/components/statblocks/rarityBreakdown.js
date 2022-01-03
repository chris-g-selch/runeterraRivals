import react from "react";
import "./typeBreakdown.css";
import commonPNG from "../../static/common.png";

const RarityBreakdown = ({ chartData, dispatch}) => {

    let rarityData = { Common : 0, Rare: 0, Epic: 0, Champion: 0}
    for( let factionRef in chartData ) {
        for(let rarity in chartData[factionRef].rarities){
            
            rarityData[rarity] += chartData[factionRef].rarities[rarity];
        }
    }

    return (
        <div id="rarityBreakdown" className="breakdown">
            <div>
                <button className="btn--hide" onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Common" })}}><div id="common" className="icon"></div></button> 
                <span className="number">{rarityData.Common}</span>
            </div>
            <div>
                <button className="btn--hide" onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Rare" })}}><div id="rare" className="icon"></div></button> 
                <span className="number">{rarityData.Rare}</span>
            </div>
            <div>
                <button className="btn--hide" onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Epic" })}}><div id="epic" className="icon"></div></button>
                <span className="number">{rarityData.Epic}</span>
            </div>
            <div>
                <button className="btn--hide" onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Champion" })}}><div id="champion" className="icon"></div></button> 
                <span className="number">{rarityData.Champion}</span>
            </div>
        </div>
    )
}

export default RarityBreakdown;