import React, {useState, useEffect} from "react";


    // {
    //   direction:"Down",//Down | UP |Both
    //   type: "Position",  // Postion | Distance
    //   value: 500,
    // }
const useScrollEvent = (config, dependcyList, callback) => {

    let lastScroll = 0;
    let distanceAccumulated = 0;
    const [ticking, setTicking] = useState(false);



    const checkScroll = (newPos) => {
        switch(config.type) {
            case "position":
                if(newPos === config.value)
                    return true;
            break;

            case "distance":
                if(distanceAccumulated >= config.value)
                    return true;
            break;

            default:
                return false;
        }
    }

    const checkDirection = (newPos) => {
        if(config.direction == "both")
            return true;

        let direction = null;
        if(lastScroll < newPos){
            direction = "down";
        } else {
            direction = "up";
        }

        if(config.direction === direction)
            return true;

        return false;
    }

   

    useEffect(() => {

        const onScrollHandler = (e) => {
            if(checkDirection(window.scrollY)){
                distanceAccumulated += Math.abs(window.scrollY - lastScroll);
                
                if(checkScroll(window.scrollY)){
    
                    if(!ticking){
                        window.requestAnimationFrame(() => {
                            callback();
    
                            setTicking(false);
                        })
                    
                        setTicking(true);
                    }
                }
            }
            lastScroll = window.scrollY;
        }
    

        //set Scroll event listener
        document.addEventListener("scroll", onScrollHandler)       
        
        return () => {
            document.removeEventListener("scroll", onScrollHandler)
        }

    }, dependcyList)
}

export default useScrollEvent;