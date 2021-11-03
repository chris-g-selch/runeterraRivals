import React from 'react';
import "./style.css";
const CardImage = ({card}) =>{
    let url = 'https://pbs.twimg.com/profile_images/667121889597239296/IXnv9Su7.jpg'; //some image not found

    if(card.assets !== undefined && card.assets.length >= 1){
        if(card.assets[0].gameAbsolutePath !== undefined){
            url = card.assets[0].gameAbsolutePath;
        }
    } 
    
    return(
        <>
            <img className="cardImage" src={url} />
        </>
    );
}

export default CardImage;