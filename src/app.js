import React, {useReducer, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./main.css";
import Navbar from "./components/anatomy/navbar";
import Menu from "./components/anatomy/menu";

//Services
import { initialUserData, reducer } from "./reducers/user";
import PlatformService from "./services/platform";
import Cookie from "./util/cookie";

//pages
import Home from "./components/page/home";
import DeckPage from "./components/page/deck";
import PlayerPage from "./components/page/player";
import LoginPage from "./components/page/login";
import RivalPage from "./components/page/rival";


export const UserContext = React.createContext();

const App = () => {
    const [user, dispatch] = useReducer(reducer, initialUserData);
    
    useEffect(() => {
        //User platform service stuff
        let token = Cookie.getCookie("runeterra-token");
        if(token){
            PlatformService.userFromToken(token)
            .then(user => { 
                dispatch({ type:"set-user", payload: user }) 
            })
            .catch(err => console.log(err))
        }

    }, [])

    

    return (
        <Router>
            <UserContext.Provider value={{user: user, dispatch: dispatch}}>
                <div id="screen-wrapper">
                    <Navbar>
                        <Link to="/" ><div id="logo"><div id="logo__circle">R</div><div>Rivals</div></div></Link>
                        <Menu /> 
                    </Navbar>
                    
                    
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:summoner/:tag" element={<Home />}  />
                            <Route path="/Deck" element={<DeckPage />}>
                                <Route path=":deckcode" element={<DeckPage />} />
                            </Route>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/rivals" element={<RivalPage />}  />
                        </Routes>
                    
                </div>
            </UserContext.Provider>
        </Router>
    )
}

export default App;