import react from "react";

const RarityBreakdown = ({ chartData, dispatch}) => {

    let rarityData = { Common : 0, Rare: 0, Epic: 0, Champion: 0}
    for( let factionRef in chartData ) {
        for(let rarity in chartData[factionRef].rarities){
            
            rarityData[rarity] += chartData[factionRef].rarities[rarity];
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Common" })}}>Common</button> {rarityData.Common}
            </div>
            <div>
                <button onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Rare" })}}>Rare</button> {rarityData.Rare}
            </div>
            <div>
                <button onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Epic" })}}>Epic</button> {rarityData.Epic}
            </div>
            <div>
                <button onClick={() => {dispatch({ type:"filter-by-rarityRef", payload: "Champion" })}}>Champion</button> {rarityData.Champion}
            </div>
        </div>
    )
}

export default RarityBreakdown;