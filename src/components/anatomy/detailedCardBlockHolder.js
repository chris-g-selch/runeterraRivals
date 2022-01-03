import react from "react";
import DetailedCardBlock from "./detailedCardBlock";
import "./detailedCardBlockHolder.css";

const DetailedCardBlockHolder = ({deck}) => {
    const landmarks = deck.filter(cardObj => cardObj.details.type === "Landmark");
    const champion = deck.filter(cardObj => cardObj.details.type === "Unit" && cardObj.details.rarity === "Champion");
    const units = deck.filter(cardObj => cardObj.details.type === "Unit" && cardObj.details.rarity !== "Champion");
    const spells = deck.filter(cardObj => cardObj.details.type === "Spell");

    return(
        <div id="cardBlockHolder">
            <div id="champions">
                <div className="headingDecoration"><h1>champions</h1></div>
                {
                    champion && champion.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
                
            </div>
            <div id="units">
                <div className="headingDecoration"><h1>units</h1></div>
                {
                    units && units.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
            <div id="spells">
                <div className="headingDecoration"><h1>spells</h1></div>
                {
                    spells && spells.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
            <div id="landmarks">
                <div className="headingDecoration"><h1>landmarks</h1></div>
                {
                    landmarks && landmarks.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
        </div>
    )
}
export default DetailedCardBlockHolder;