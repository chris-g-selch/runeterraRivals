import react, {useState, useEffect, useReducer} from "react";
import { default as set1 } from '../riotData/set1-en_us/en_us/data/set1-en_us.json';
import { default as set2 } from '../riotData/set2-en_us/en_us/data/set2-en_us.json';
import { default as set3 } from '../riotData/set3-en_us/en_us/data/set3-en_us.json';
import { default as set4 } from '../riotData/set4-en_us/en_us/data/set4-en_us.json';
import { default as set5 } from '../riotData/set5-en_us/en_us/data/set5-en_us.json';
import {DeckEncoder} from '../riotData/runeterra-master';

import RegionChart from "../components/charts/regionChart";
import ManaChart from "../components/charts/manaChart";
import KeywordsChart from "../components/charts/keywordsChart";
import { initialDecks, reducer } from "../reducers/decks";
import {buildChartData } from "./randomExports";
import CardGallery from "./cardGallery";
import DetailedCardBlockHolder from "./detailedCardBlockHolder";
import TypeBreakdown from "../components/statblocks/typeBreakdown";
import RarityBreakdown from "../components/statblocks/rarityBreakdown";
import UnitChart from "../components/charts/unitChart";

const DeckView = ({deckcode}) => {

    const [deckInfo, dispatch] = useReducer(reducer, initialDecks);
    const [chartData, setChartData] = useState({});

    useEffect(() => {

        const deck = DeckEncoder.decode(deckcode);

        
        let masterList = [...set1, ...set2, ...set3, ...set4, ...set5];
        let deckCodeList = [];
        //console.log(deck);
        
        for(let card of deck){
            deckCodeList.push(card.code);
        }
        
        let detailedCardList = masterList.filter(obj => deckCodeList.includes(obj.cardCode));
        //console.log(detailedCardList);
        
        for(let card of deck){
            let detailedCard = detailedCardList.find(obj => obj.cardCode === card.code);
            if(detailedCard === undefined){
                console.log(`Missing Card Code ${card.code}`);
                break;
            }

            card.details = detailedCard;
        }

        console.log(deck);
        console.log(buildChartData(deck));

        dispatch({ type:"set-master", payload: deck})

    }, [])

    //rebuild chartData
    useEffect(() =>{
        setChartData(buildChartData(deckInfo.filtered));
    }, [deckInfo])

    return (
        <div>
            <button onClick={() => dispatch({ type:"reset" })}>reset</button>
            <RegionChart dispatch={dispatch} chartData={chartData} />
            <ManaChart  dispatch={dispatch} chartData={chartData} />
            <KeywordsChart dispatch={dispatch} chartData={chartData} />
            <TypeBreakdown dispatch={dispatch} chartData={chartData} />
            <RarityBreakdown dispatch={dispatch} chartData={chartData} />
            <UnitChart dispatch={dispatch} chartData={chartData} />
            <DetailedCardBlockHolder deck={deckInfo.filtered} />
            <CardGallery deck={deckInfo.filtered} />
        </div>
    );
}

export default DeckView