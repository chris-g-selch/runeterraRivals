import react from 'react'
import reactDom from 'react-dom';
import PlayerHistory from "./components/views/playerHistoryView";
import Deck from "./components/views/deckView";
import App from "./app.js";

const kokuDeck = "CECQCAIDCQAQGBASAECAIEADAUBQCCINAQAQIJRHFU2AIAIBAMXACAIEAEAQGAYPAECQGBQCAEAQGMYBAUBQI";
const landmarksDeck = "CEBAEAIBAEWQGAIAAYERMAYBAMAACAYBAEDSMLQEAEAAWIRGF4CQCAQAAIAQEAIEAECACDQDAEAQSIBSAMBQABIIBI";

reactDom.render(
    <App />,
    document.getElementById('root')
);

