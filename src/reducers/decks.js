export const initialDecks = {
    master: [],
    filtered: []
}

export const reducer = (state, action) => {
    switch(action.type){
        case "set-master":
            return { master: action.payload, filtered: action.payload };

        case "set-filtered":
            return {...state, filtered: action.payload };

        case "reset":
            return {...state, filtered: state.master};
        
        
        case "filter-by-region":
            let filteredDeck = state.master.filter(card => card.details.region === action.payload );
            return {...state, filtered: filteredDeck };

        default:
           return state;
    } 
}