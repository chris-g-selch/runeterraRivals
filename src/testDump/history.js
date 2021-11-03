import React, {useState, useEffect} from "react";
import axios from "axios";
import "./style.css";


const PlayerHistory = () => {
    const serverApi = "http://localhost:2000/user";
    const [userHistory, setterUserHistory] = useState({ playerName:"", tagName: "", lastMatches:[], matchListCodesLeft: []});
    const [processingRequest, processingRequestSetter ] = useState(false);

    const  getHistory = async (event) =>{
        try{
            if(processingRequest === false){
                processingRequestSetter(true);
                let call = await axios({
                    method: "post",
                    url: serverApi,
                    responseType: "json",
                    data:{
                        username: "SilverMidBoss",
                        tag: "Na1"
                    }
                })

                console.log(call.data);
                processingRequestSetter(false);
                setterUserHistory(call.data);
             
            }
        }catch (err){
            processingRequestSetter(false);
        }
    }
    return (
        <>
            <div className="historyGrid">
                <div className="searchPlayerControls">
                    <input type="text" name="username" />
                    <select name="tag">
                        <option value="Na1">NA 1</option>
                    </select>
                    {
                        processingRequest && <button onClick={getHistory} disabled>Fire</button>
                        
                    }
                    {   
                        !processingRequest && <button onClick={getHistory}>Fire</button>
                    }
                </div>
                <div className="match">
                    {
                        userHistory.lastMatches.map((obj) => {
                            return (
                                <div className="matchTab">
                                    <div>
                                        <span>game_mode: {obj.game_mode} </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PlayerHistory;