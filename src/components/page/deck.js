import react from "react";
import { useParams } from "react-router-dom";
import DeckView from "../views/deckView";

const DeckPage = () =>{
    let params = useParams();

    return (
        <>
            <DeckView deckcode={params.deckcode} />
        </>
    );
}

export default DeckPage;