import React, {useState, useEffect} from "react";
import axios from "axios";
import HistoryCard from "../../testDump/historyCard";
import { useLocation } from "react-router-dom";
import "../../testDump/style.css";


const PlayerHistoryView = () => {
    const serverApi = "http://localhost:2000/summoner";
    const [formData, setFormData] = useState({ "summoner":"", "tag": "Na1" });
    const [userHistory, setterUserHistory] = useState({ playerName:"", tagName: "", lastMatches:[], matchListCodesLeft: []});
    const [processingRequest, processingRequestSetter ] = useState(false);

    const testObj = {"playerName":"SilverMidBoss","tagName":"Na1","matchListCodesLeft":["2c063335-594d-4060-aea9-1db7c13a8b8a","f7e0ac84-176a-462b-a68d-cd62d7a206cc","34171258-b3b6-4196-8e2a-8e85b46143a7","0fc6b837-745a-4fc7-ac79-294c636b4f7b","a234e2b7-9b1c-4c20-b5e9-bfd3ff706e5a","cb380333-89ae-4e98-ba4b-008bb7126f8e","c936ef66-939d-430a-b63b-5bafa563c4e9","a53c6132-7129-499e-bc37-f2b8dfa7f64d","d5f50e18-0e66-473c-8d3a-38cda12a2b10","cc385ab8-1ba2-4176-bf37-371ed536b6f4","91ea0501-05f6-4b25-bd91-69a7b90297fe","53bf202b-a367-4226-b055-1ad0179e6714","e41875ad-5b8a-43db-9806-4bc3b76f2af4","f7b84647-d76d-4e49-ab1e-14abeca3a1e5","ce49e54e-2d6f-4af6-b03b-650b2473d311","481d53f6-b2e4-4d14-b198-aa3d9409531e","e4d396f9-73db-449c-acb8-5b00f76796a3","b221114a-d04a-43ee-8c4b-2a3f0b8afc95","a9472934-80b0-4d6c-93d9-61dcca6c0a6e"],"lastMatches":[{"game_mode":"Constructed","game_type":"Normal","game_start_time_utc":"2021-11-09T03:28:37.8429871+00:00","game_version":"live_2_18_4","players":[{"puuid":"XM2PjfhYAD4zMl9Is_vh9cn9wrXa485B1vsnGxdw1qGO7lJBdJZQQcVBf38GJmCm8GrGjqS2J_Hfmg","deck_id":"80f7780b-9be0-4cd7-8fc5-d1cadce1e9c4","deck_code":"CIBAEAIDFYYQGAICAQEA6AYCAEBQ2NQCAIBAIBIFAEBAECILFY4AGAIBAMBACAQDBECQCAQNCEQSOKI","factions":["faction_Ionia_Name","faction_Noxus_Name"],"game_outcome":"loss","order_of_play":0},{"puuid":"IsK0cMMqUfGrlFDpgrNaiatqot58UNiWvVy7cpAqqCv52CBAbB4bjCMNdLebwnVDXVmqxz9uCr8tjQ","deck_id":"348410e2-cb99-4c52-a2b0-4eaf15e72791","deck_code":"CQBQCBAAB4AQKCRJAYAQAAIGCQSCOMYDAEBQADQBAQAAQBIBAAFBEGJCFYBACAQAAEAQIAAF","factions":["faction_Demacia_Name"],"game_outcome":"win","order_of_play":1}],"total_turn_count":26}]}
    
    const  getHistory = async (event) =>{
        try{
            if(processingRequest === false){
                processingRequestSetter(true);
                let call = await axios({
                    method: "post",
                    url: serverApi,
                    responseType: "json",
                    data:formData
                })

                console.log(call.data);
                processingRequestSetter(false);
                setterUserHistory(call.data);
                
             
            }
        }catch (err){
            processingRequestSetter(false);
        }
    }

    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <>
            <div className="historyGrid">
                <section className="searchPlayerControls">
                    <div className="center">
                        <input type="text" name="summoner" placeholder="Search Summoner" value={formData.summoner} onChange={onChangeHandler} />
                        <select name="tag" onChange={onChangeHandler} value={formData.tag} >
                            <option value="Na1">NA 1</option>
                        </select>
                        {
                            processingRequest && <button onClick={getHistory} disabled>Fire</button>
                            
                        }
                        {   
                            !processingRequest && <button onClick={getHistory}>Fire</button>
                        }
                    </div>
                </section>
                <div className="match">
                    {
                        userHistory.lastMatches.map((obj) => {
                            return <HistoryCard obj={obj} />
                        })
                    }
                    <ul>
                        {
                            userHistory.matchListCodesLeft.map(matchId => <li key={matchId}>{matchId}</li>)
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PlayerHistoryView;