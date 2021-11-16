import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import Home from "./components/page/home";
import DeckPage from "./components/page/deck";
import PlayerPage from "./components/page/player";
const App = () => {

    return (
        <Router>
            <div id="screen-wrapper">
                <header>
                    <img id="logo" src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/04/The-Melancholy-Of-Haruhi-Suzumiya-Featured-Image.jpg" />
                </header>
                <section id="main-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} >
                            <Route path=":summoner" element={<Home />}>
                                <Route path=":tag" element={<Home />} />
                            </Route>
                        </Route>
                        <Route path="/Deck" element={<DeckPage />}>
                            <Route path=":deckcode" element={<DeckPage />} />
                        </Route>
                    </Routes>
                </section>
            </div>
        </Router>
    )
}

export default App;