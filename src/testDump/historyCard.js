import React from 'react';
import { Link } from "react-router-dom";
import DeckView from '../components/views/deckView';

import { default as coreData } from "../riotData/core/en_us/data/globals-en_us.json";
import "./style.css";

const MatchHistoryCard = ({obj}) => {
    let mapper = {
        faction_Demacia_Name: "Demacia",
        faction_Ionia_Name: "Ionia",
        faction_Noxus_Name: "Noxus",
        faction_Freljord_Name: "Freljord",
        faction_Piltover_Name: "Piltover & Zaun",
        faction_ShadowIsles_Name: "Shadow Isles"

    }

    // const obj = {
    //     "game_mode":"Constructed",
    //     "game_type":"Normal",
    //     "game_start_time_utc":"2021-11-09T03:28:37.8429871+00:00",
    //     "game_version":"live_2_18_4",
    //     "players":[
    //         {
    //             "puuid":"XM2PjfhYAD4zMl9Is_vh9cn9wrXa485B1vsnGxdw1qGO7lJBdJZQQcVBf38GJmCm8GrGjqS2J_Hfmg",
    //             "deck_id":"80f7780b-9be0-4cd7-8fc5-d1cadce1e9c4",
    //             "deck_code":"CIBAEAIDFYYQGAICAQEA6AYCAEBQ2NQCAIBAIBIFAEBAECILFY4AGAIBAMBACAQDBECQCAQNCEQSOKI",
    //             "factions":["faction_Ionia_Name","faction_Noxus_Name"],
    //             "game_outcome":"loss",
    //             "order_of_play":0
    //         },
    //         {
    //             "puuid":"IsK0cMMqUfGrlFDpgrNaiatqot58UNiWvVy7cpAqqCv52CBAbB4bjCMNdLebwnVDXVmqxz9uCr8tjQ",
    //             "deck_id":"348410e2-cb99-4c52-a2b0-4eaf15e72791",
    //             "deck_code":"CQBQCBAAB4AQKCRJAYAQAAIGCQSCOMYDAEBQADQBAQAAQBIBAAFBEGJCFYBACAQAAEAQIAAF",
    //             "factions":["faction_Demacia_Name"],
    //             "game_outcome":"win",
    //             "order_of_play":1
    //         }
    //     ],
    //     "total_turn_count":26
    // };

    const outcoume = obj.players[0].game_outcome;
    const firstAttack = new Boolean(obj.players[0].order_of_play);

    let playerOnefactions =[];
    for(let faction of obj.players[0].factions){
        let factionObj = coreData.regions.find(obj => obj.name === mapper[faction]);
        playerOnefactions.push(factionObj.iconAbsolutePath)
    }

    let playerTwofactions =[];
    for(let faction of obj.players[1].factions){
        let factionObj = coreData.regions.find(obj => obj.name === mapper[faction]);
        playerTwofactions.push(factionObj.iconAbsolutePath)
    }
    const playerOneDeckcode = obj.players[0].deck_code;
    const playerTwoDeckcode = obj.players[1].deck_code;

    let matchDate = new Date(obj.game_start_time_utc);
    return(
        <div className={`matchTab ${outcoume}`}>
            <div className="statHeader">
                <span>{obj.game_mode}</span>
                <span>{obj.game_type}</span>
                <span>{matchDate.toDateString()}</span>
                <span>{obj.total_turn_count}</span>
            </div>
         
            <div className="playerContainer">
                <div className="playerFlex">
                    <div className="playerOne playerTab">
                        <div>some players name</div>
                        <div>
                        {
                            firstAttack && "first Attack"
                        }
                        </div>
                        <Link to={`/Deck/${playerOneDeckcode}`} >
                        {
                            //"CIBAEAIDFYYQGAICAQEA6AYCAEBQ2NQCAIBAIBIFAEBAECILFY4AGAIBAMBACAQDBECQCAQNCEQSOKI"
                            playerOnefactions.map((obj, index) => <img key={index} src={obj} />)
                        }
                        </Link>
                    </div>

                    <div className="playerTwo playerTab">
                        <div>some players name</div>
                        <div>
                            <button>Add Player to rival list</button>
                        </div>
                        <div>
                            <button>View player's History</button>
                        </div>
                        <Link to={`/Deck/${playerTwoDeckcode}`} >
                        {
                            //"CQBQCBAAB4AQKCRJAYAQAAIGCQSCOMYDAEBQADQBAQAAQBIBAAFBEGJCFYBACAQAAEAQIAAF"
                            playerTwofactions.map((obj, index) => <img key={index} src={obj} />)
                        }
                        </Link>
                    </div>
                </div>    
            </div>
        </div>
    )
}
export default MatchHistoryCard;