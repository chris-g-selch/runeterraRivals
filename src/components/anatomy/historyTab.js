import React from 'react';
import PlayerCard from './playerCard';
import "./historyTab.css";
import vsLogo from "../../static/vs.png";

const MatchHistoryTab = ({game_mode, game_type, game_start_time_utc, game_version, players, total_turn_count, summoner}) => {
   

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

    //Get out come
    let riotExpeditions ="Power_XP1";
    let winnerPlayer = players.find(obj => obj.game_outcome === "win")
    let outcome = "ai";
    if(game_mode === riotExpeditions){
        game_mode = "Expeditions";
        players = [];
    }

    if(winnerPlayer !== undefined ) {
        outcome  = (winnerPlayer.summoner === summoner) ? "win" : "loss";
    }
    let matchDate = new Date(game_start_time_utc);

    return(
        <div className={`tab tab--${outcome}`}>
            { players[0] && <PlayerCard {...players[0]} /> }
            <div className="tab__stats">
                <h1>{game_mode}</h1>
                <h2>{game_type}</h2>
                { players.lengths > 2 && <img className="tab__vs" src={vsLogo} /> }
                {outcome !== "ai" && <span>{matchDate.toDateString()}</span> }
                {/* <span>{total_turn_count}</span> */}
            </div>
            { players[1] && <PlayerCard css="playerCard--reverse" {...players[1]} /> }
        </div>
    )
}
export default MatchHistoryTab;