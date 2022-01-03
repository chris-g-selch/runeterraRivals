import react, {useState, useEffect, useReducer} from "react";
import { default as set1 } from '../../riotData/set1-en_us/en_us/data/set1-en_us.json';
import { default as set2 } from '../../riotData/set2-en_us/en_us/data/set2-en_us.json';
import { default as set3 } from '../../riotData/set3-en_us/en_us/data/set3-en_us.json';
import { default as set4 } from '../../riotData/set4-en_us/en_us/data/set4-en_us.json';
import { default as set5 } from '../../riotData/set5-en_us/en_us/data/set5-en_us.json';
import { getDeckFromCode } from "lor-deckcodes-ts";

import { useLocation } from "react-router-dom";
import RegionChart from "../charts/regionChart";
import ManaChart from "../charts/manaChart";
import KeywordsChart from "../charts/keywordsChart";
import { initialDecks, reducer } from "../../reducers/decks";
import {buildChartData } from "../../testDump/randomExports";
import CardGallery from "../../testDump/cardGallery";
import DetailedCardBlockHolder from "../anatomy/detailedCardBlockHolder";
import TypeBreakdown from "../statblocks/typeBreakdown";
import RarityBreakdown from "../statblocks/rarityBreakdown";
import UnitChart from "../charts/unitChart";
import "./deckView.css";

const DeckView = ({deckcode}) => {
    let location = useLocation();
    const [deckError, setDeckError] = useState(false);
    const [deckInfo, dispatch] = useReducer(reducer, initialDecks);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        let deck = []
        try {
            deck = getDeckFromCode(deckcode);
            setDeckError(false);
        } catch (err){
            console.log(err);
            setDeckError(true);
        }

        let masterList = [...set1, ...set2, ...set3, ...set4, ...set5];
        let deckCodeList = [];
        //console.log(deck);
        
        for(let card of deck){
            deckCodeList.push(card.cardCode);
        }
        
        let detailedCardList = masterList.filter(obj => deckCodeList.includes(obj.cardCode));
        //console.log(detailedCardList);
        
        for(let card of deck){
            let detailedCard = detailedCardList.find(obj => obj.cardCode === card.cardCode);
            if(detailedCard === undefined){
                console.log(`Missing Card Code ${card.cardCode}`);
                break;
            }

            card.details = detailedCard;
        }

        // console.log(deck);
        // console.log(buildChartData(deck));
        console.log(location);
        dispatch({ type:"set-master", payload: deck})

    }, [])

    //rebuild chartData
    useEffect(() =>{
        setChartData(buildChartData(deckInfo.filtered));
    }, [deckInfo])


    //view
    const errorView = <h1>Error Loading Deck</h1>;

    const view =<>
                <button onClick={() => dispatch({ type:"reset" })}>reset</button>
                <div id="deckViewContainer">
                    <div id="chartsContainer">
                        <RegionChart dispatch={dispatch} chartData={chartData} />
                        <ManaChart  dispatch={dispatch} chartData={chartData} />
                        <KeywordsChart dispatch={dispatch} chartData={chartData} />    
                        <UnitChart dispatch={dispatch} chartData={chartData} />
                    </div>
                    <TypeBreakdown dispatch={dispatch} chartData={chartData} />
                    <RarityBreakdown dispatch={dispatch} chartData={chartData} />
                    <DetailedCardBlockHolder deck={deckInfo.filtered} />
                    {/* <CardGallery deck={deckInfo.filtered} /> */}
                </div>
                </> ;

    //Render
    if (deckError)
        return errorView;

    return view;
}

export default DeckView