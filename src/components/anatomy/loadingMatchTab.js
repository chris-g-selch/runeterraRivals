import React from "react";
import "./historyTab.css";
const LoadingMatchTab = ({isLoading, countdown,  isCounting}) => {

    return(
        <div className="tab tab--brand">
            <div className="tab__center">
                {
                    isCounting && <>
                                    <div className="tab__bigMessage">
                                        <span>{countdown}</span>
                                    </div>
                                    <p className="tab__smallMessage">Waiting.. to get other matches</p>
                                  </>
                    
                }
                {
                    !isCounting &&
                    <div className="tab__bigMessage">
                        <p>Scroll to load other matches</p>
                    </div>
                }          
                {
                    isLoading &&
                    <div className="tab__loading">
                                                                            
                    </div>
                }
            </div>
        </div>
    )

}

export default LoadingMatchTab;