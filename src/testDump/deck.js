import react, {useState, useEffect, useReducer} from "react";
import { default as set1 } from '../riotData/set1-en_us/en_us/data/set1-en_us.json';
import { default as set2 } from '../riotData/set2-en_us/en_us/data/set2-en_us.json';
import { default as set3 } from '../riotData/set3-en_us/en_us/data/set3-en_us.json';
import { default as set4 } from '../riotData/set4-en_us/en_us/data/set4-en_us.json';
import { default as set5 } from '../riotData/set5-en_us/en_us/data/set5-en_us.json';
import {DeckEncoder} from '../riotData/runeterra-master';
import DetailedCardBlock from "./detailedCardBlock";
import RegionChart from "./regionChart";
import ManaChart from "./manaChart";
import { initialDecks, reducer } from "../reducers/decks";
import {buildChartData } from "./randomExports";

const DeckView = () => {

    const [deckInfo, dispatch] = useReducer(reducer, initialDecks);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const kokuDeck = "CECQCAIDCQAQGBASAECAIEADAUBQCCINAQAQIJRHFU2AIAIBAMXACAIEAEAQGAYPAECQGBQCAEAQGMYBAUBQI";
        const landmarksDeck = "CEBAEAIBAEWQGAIAAYERMAYBAMAACAYBAEDSMLQEAEAAWIRGF4CQCAQAAIAQEAIEAECACDQDAEAQSIBSAMBQABIIBI";
        const deck = DeckEncoder.decode(landmarksDeck);
        
        
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
        setChartData(buildChartData(deck));
    }, [])



    return (
        <div>
            <button onClick={() => dispatch({ type:"reset" })}>reset</button>
            <RegionChart dispatch={dispatch} chartData={chartData} />
            <ManaChart  dispatch={dispatch} chartData={chartData} />
            {
                deckInfo.filtered.map((obj) => <DetailedCardBlock key={obj.code} card={obj} /> )
            }
        </div>
    );
}

export default DeckView