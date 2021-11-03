import React from 'react';
import { default as set1 } from '../riotData/set1-en_us/en_us/data/set1-en_us.json';
import { default as set2 } from '../riotData/set2-en_us/en_us/data/set2-en_us.json';
import { default as set3 } from '../riotData/set3-en_us/en_us/data/set3-en_us.json';
import { default as set4 } from '../riotData/set4-en_us/en_us/data/set4-en_us.json';
import {DeckEncoder} from '../riotData/runeterra-master';
import CardImage from './card';
import "./style.css";

const CardList = () => {
    const deck = DeckEncoder.decode("CEAQMAIAAQKBSGREE4BQCAQAAEBAIAADBACACAAGEIUTGBABAIAAKAQBAAAQOAQDAAGA4AYEAABAKCQ");
    let masterList = [...set1, ...set2, ...set3, ...set4];
    let deckCodeList = [];
    //console.log(deck);
    for(let card of deck){
        deckCodeList.push(card.code);
    }
    //console.log(deckCodeList);
    let detailedCardList = masterList.filter(obj => deckCodeList.includes(obj.cardCode));
    //console.log(detailedCardList);
    
    let retunCardElements = [];
    let keyIndexCantSortList = 0;
    for(let card of deck){
        let detailedCard = detailedCardList.find(obj => obj.cardCode === card.code);
        if(detailedCard === undefined){
            console.log(`Missing Card Code ${card.code}`);
            break;
        }

        for(let i = 0; i < card.count; i++){
            retunCardElements.push(<CardImage key={card.code + "Number"+ i} card={detailedCard} />);
        }
    }
    
    //console.log(retunCardElements);

    
 
    return (
        <>
            <div className="cardGrid">
                {retunCardElements}
            </div>
            
        </>
    )
}

export default CardList;