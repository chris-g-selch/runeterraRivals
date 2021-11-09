import react from "react";

const DetailedCardBlock = ({card}) => {
    let url = 'https://pbs.twimg.com/profile_images/667121889597239296/IXnv9Su7.jpg'; //some image not found
    let otherBackground = "https://static.vecteezy.com/system/resources/thumbnails/002/104/366/small/abstract-modern-diagonal-stripes-red-background-and-texture-with-lines-vector.jpg"
    if(card.details.assets !== undefined && card.details.assets.length >= 1){
        if(card.details.assets[0].fullAbsolutePath !== undefined){
            url = card.details.assets[0].fullAbsolutePath;
        }
    } 


    return(
        <>
            <div className="cardBlock" >
                <span>{card.count}</span>
                <span>{card.details.name}</span>
                <span>{card.details.cost}</span>
            </div> 

        </>
    )
}

export default DetailedCardBlock;