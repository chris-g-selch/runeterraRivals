import react from "react";
import DetailedCardBlock from "./detailedCardBlock";

const DetailedCardBlockHolder = ({deck}) => {
    const landmarks = deck.filter(cardObj => cardObj.details.type === "Landmark");
    const champion = deck.filter(cardObj => cardObj.details.type === "Unit" && cardObj.details.rarity === "Champion");
    const units = deck.filter(cardObj => cardObj.details.type === "Unit" && cardObj.details.rarity !== "Champion");
    const spells = deck.filter(cardObj => cardObj.details.type === "Spell");

    return(
        <div>
            <div className="champions">
                <p>champions</p>
                {
                    champion && champion.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
                
            </div>
            <div className="units">
                <p>units</p>
                {
                    units && units.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
            <div className="spells">
                <p>spells</p>
                {
                    spells && spells.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
            <div className="landmarks">
                <p>landmarks</p>
                {
                    landmarks && landmarks.map((cardObj) => <DetailedCardBlock key={cardObj.code} card={cardObj} />)
                }
            </div>
        </div>
    )
}
export default DetailedCardBlockHolder;