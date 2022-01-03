import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import PlatformService from "../../services/platform";
import HistoryTab from "../anatomy/historyTab";
import LoadingMatchTab from "../anatomy/loadingMatchTab";
import "./playerHistoryView.css";
import "../../testDump/style.css";
import useScrollEvent from "../../hooks/useScrollEvent";



const PlayerHistoryView = ({summoner, tag}) => {
    const serverApi = "http://localhost:2000/summoner";
    const [formData, setFormData] = useState({ "summoner":"", "tag": "Na1" });
    const [lastSearchedSummoner, setLastSearchSummoner] = useState("")
    const [userHistory, setterUserHistory] = useState({ playerName:"", tagName: "", lastMatches:[], matchListCodesLeft: []});
    
    const [processingRequest, processingRequestSetter] = useState(false);

    //window stuff
    const [processingWindowRequest, processingWindowRequestSetter] = useState(false);

    const defaultCountdown = 5;
    const [windowCountdown, setWindowCountdown] = useState(defaultCountdown);

    

    
    let countdownInterval = null;

    const countingDown = () => {
        setWindowCountdown((prevState) => { 
            let newState = prevState - 1;
            if(newState === 0){
                if(countdownInterval){
                    processingWindowRequestSetter(false);
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    getNextMatchCode();
                }
                return defaultCountdown;
            }
            return newState;
        });
    }

    const getNextMatchCode = (e) => {
        console.log("still firing");
        if(userHistory.matchListCodesLeft.length > 0){
            console.log(processingWindowRequest);
            if(!processingWindowRequest){
                processingWindowRequestSetter(true);
                const nextMatchCode = userHistory.matchListCodesLeft.shift();
                
                //Promise.reject({code: 23, message: "hello"})
                PlatformService.getMatch(nextMatchCode)
                .then(match => {
                    userHistory.lastMatches.push(match);     
                    setterUserHistory({...userHistory});
                    //wait 11 seconds
                    if(!countdownInterval)
                        countdownInterval = setInterval(countingDown, 1000);
                })
                .catch(err => {
                    alert(err);
                    console.log(err);
                })

            }
        }
    }

    useEffect(() => {
        let tabs = document.querySelectorAll(".tab");

        let cssObserver = new IntersectionObserver((entries)=> {
            console.log("number of entries:" + entries.length)
            for(let entry of entries){
                console.log(entry);
                entry.target.classList.toggle("tab--preload", !entry.isIntersecting);
            }
        }, { threshold: .10})

        tabs.forEach(element => {
            console.log(`observing ${element}`);
            cssObserver.observe(element)    
        });
        
        return () => {
            tabs.forEach(element => {
                console.log(`unobserving ${element}`);
                cssObserver.unobserve(element);
            })
        }
    }, [userHistory])

    
    

    useScrollEvent({
        type:"distance",
        direction: "both",
        value: 500
    },[userHistory, processingWindowRequest],getNextMatchCode)
    
    //Platform services
    useEffect(() => {
        if(typeof summoner === "string" && typeof tag === "string") {
            let data = {...formData, summoner, tag };
            historyCall(data);
            setFormData(data);            
        }
    }, [summoner, tag])


    const historyCall = async (data) =>{
        try{
            if(processingRequest === false){
                processingRequestSetter(true);
                let call = await axios({
                    method: "post",
                    url: serverApi,
                    responseType: "json",
                    data:data
                })
                setLastSearchSummoner(data.summoner);
                console.log(call.data);
                processingRequestSetter(false);
                setterUserHistory(call.data);
                
             
            }
        }catch (err){
            processingRequestSetter(false);
        }
    }   

    const  getHistory = async (event) =>{
        historyCall(formData);
        event.preventDefault();
    }

    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const addMatch = (matchCode) => {
        PlatformService.getMatch(matchCode)
        .then(match => {
            userHistory.lastMatches.push(match);     

            setterUserHistory({...userHistory});
        })
    }
    
    return (
        <>
            <div className="historyGrid">
                <section className="searchPlayerControls">
                    <div className="center">
                        <form onSubmit={getHistory}>
                        <input type="text" name="summoner" placeholder="Search Summoner" value={formData.summoner} onChange={onChangeHandler} />
                        <select name="tag" onChange={onChangeHandler} value={formData.tag} >
                            <option value="Na1">NA 1</option>
                            <option value="LAN">LAN</option>
                            <option value="BR1">BR 1</option>
                        </select>
                        {
                            processingRequest && <button type="submit" disabled>Fire</button>
                            
                        }
                        {   
                            !processingRequest && <button type="submit">Fire</button>
                        }
                        </form>
                    </div>
                </section>
                <div className="match">
                
                    {
                        userHistory.lastMatches.map((obj, index) => {
                            
                            return <HistoryTab key={obj.game_start_time_utc} summoner={lastSearchedSummoner} {...obj } />
                        })
                    }
                    {
                        userHistory.matchListCodesLeft.length > 0 && <LoadingMatchTab countdown={windowCountdown} isLoading={false} isCounting={processingWindowRequest} />
                    }
                </div>
            </div>
        </>
    )
}

export default PlayerHistoryView;