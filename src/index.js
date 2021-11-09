import react from 'react'
import reactDom from 'react-dom';
import PlayerHistory from "./testDump/history";
import Deck from "./testDump/deckView";

const kokuDeck = "CECQCAIDCQAQGBASAECAIEADAUBQCCINAQAQIJRHFU2AIAIBAMXACAIEAEAQGAYPAECQGBQCAEAQGMYBAUBQI";
const landmarksDeck = "CEBAEAIBAEWQGAIAAYERMAYBAMAACAYBAEDSMLQEAEAAWIRGF4CQCAQAAIAQEAIEAECACDQDAEAQSIBSAMBQABIIBI";

reactDom.render(
    <Deck deckcode ={landmarksDeck} />,
    document.getElementById('root')
);

