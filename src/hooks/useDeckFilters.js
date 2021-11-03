import react from "react";

const useDeckFilters = (deckDispatch) => {

    const FilterDeckByRegion = (name, masterDeck) =>{
        let filteredDeck = masterDeck.filter(card => card.details.region === name );
        deckDispatch({type :"set-filtered", payload: filteredDeck});
    }

    return [FilterDeckByRegion]
}

export default useDeckFilters;