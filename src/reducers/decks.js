export const initialDecks = {
    master: [],
    filtered: []
}

export const reducer = (state, action) => {
    let filteredDeck = null;
    switch(action.type){
        case "set-master":
            return { master: action.payload, filtered: action.payload };

        case "set-filtered":
            return {...state, filtered: action.payload };

        case "reset":
            return {...state, filtered: state.master};
        
        
        case "filter-by-region":
            filteredDeck = state.master.filter(card => card.details.region === action.payload );
            return { ...state, filtered: filteredDeck };

        case "filter-by-regionRef":
            filteredDeck = state.master.filter(card => card.details.regionRef === action.payload );
            return { ...state, filtered: filteredDeck };
        
        case "filter-by-cost":
            filteredDeck = state.master.filter(card => card.details.cost === parseInt(action.payload));
            return { ...state, filtered: filteredDeck };

        case "filter-by-type":
            filteredDeck = state.master.filter(card => card.details.type === action.payload);
            return { ...state, filtered: filteredDeck};

        case "filter-by-subtype":
            filteredDeck = state.master.filter(card => card.details.subtype === action.payload);
            return { ...state, filtered: filteredDeck};

        case "filter-by-rarityRef":
            filteredDeck = state.master.filter(card => card.details.rarityRef === action.payload);
            return { ...state, filtered: filteredDeck};

        case "filter-by-keywords":
            let payloads = action.payload.split(" ");
            filteredDeck = state.master;
            for(let payload of payloads){
                filteredDeck = filteredDeck.filter(card => card.details.keywordRefs.includes(payload));
            }
            return { ...state, filtered: filteredDeck };
            
        default:
           return state;
    } 
}