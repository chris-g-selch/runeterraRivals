import react from "react";
import CardImage from "./cardImage";
const CardGallery = ({deck}) => {
    let elements = [];
    for(let cardObj of deck){
        for(let i = 0; i < cardObj.count; i++){
            elements.push(<CardImage key={cardObj.code + i} cardDetails={cardObj.details} />)
        }
    }

    return (
        <div>
            {
                elements
            }

        </div>
    )
}

export default CardGallery;