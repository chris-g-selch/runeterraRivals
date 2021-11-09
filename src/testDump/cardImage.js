import React from 'react';
import "./style.css";
const CardImage = ({cardDetails}) =>{
    let url = 'https://pbs.twimg.com/profile_images/667121889597239296/IXnv9Su7.jpg'; //some image not found

    if(cardDetails.assets !== undefined && cardDetails.assets.length >= 1){
        if(cardDetails.assets[0].gameAbsolutePath !== undefined){
            url = cardDetails.assets[0].gameAbsolutePath;
        }
    } 
    
    return(
        <>
            <img className="cardImage" src={url} />
        </>
    );
}

export default CardImage;