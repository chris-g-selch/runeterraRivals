import React, {useState, useEffect, useRef} from "react";
import "./detailedCardBlock.css";

const DetailedCardBlock = ({card}) => {
    const hoverElementRef = useRef(null);
    const cardElement = useRef(null);
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState('https://pbs.twimg.com/profile_images/667121889597239296/IXnv9Su7.jpg'); //some image not found
    const [backgroundUrl, setBackgroundUrl] = useState('https://pbs.twimg.com/profile_images/667121889597239296/IXnv9Su7.jpg'); //some image not found

    const classMapper = {
        Ionia: "detailedCard--Ionia",
        PiltoverZaun: "detailedCard--PiltoverZaun",
        Noxus: "detailedCard--Noxus",
        Freljord: "detailedCard--Freljord",
        Demacia: "detailedCard--Demacia",
        Targon: "detailedCard--Targon",
        ShadowIsles: "detailedCard--ShadowIsles",
        Shurima: "detailedCard--Shurima",
        Bilgewater:"detailedCard--Bilgewater",
        BandleCity: "detailedCard--BandleCity"
    }

    useEffect(()=>{
        if(card.details.assets !== undefined && card.details.assets.length >= 1){
            if(card.details.assets[0].gameAbsolutePath !== undefined){
                setUrl(card.details.assets[0].gameAbsolutePath);
            }

            if(card.details.assets[0].fullAbsolutePath !== undefined){
                setBackgroundUrl(card.details.assets[0].fullAbsolutePath);
            }
        } 

        
    
        for(let region of card.details.regionRefs) {
            if(classMapper[region] !== undefined){
                cardElement.current.classList.add(classMapper[region])
            }
        }
    },[])
    

    const onMouseOverHandler = (e) => {
        hoverElementRef.current.classList.add("detailedCard__hover--show");
    }

    
    const onMouseOutHandler = (e) => {
        hoverElementRef.current.classList.remove("detailedCard__hover--show");
    }

    const onClickHandler = (e) => {
        setShow(!show);
    }

    return(
        <>
            <div className="detailedCard" >
                <div ref={hoverElementRef} className="detailedCard__hover">
                    <div>
                        <img className="detailedCard__img" src={url} />
                    </div>
                </div>
                <section className="detailedCard__content" ref={cardElement} onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} onClick={onClickHandler}>
                    <span>{card.count}</span>
                    <span className="detailedCard__text" style={{backgroundImage: `url(${backgroundUrl})`}} >{card.details.name}</span>
                    <span>{card.details.cost}</span>
                </section>
                <div className={`detailedCard__dropdown ${show ? "detailedCard__dropdown--show": ""}`}>
                    <div>
                        <img className="detailedCard__img" src={url} />
                    </div>
                </div>
            </div> 
        </>
    )
}

export default DetailedCardBlock;