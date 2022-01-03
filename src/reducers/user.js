export const initialUserData = {
    isLoggedIn: false,
    createdDate: "",
    firstName: "",
    lastName: "",
    username:"",
    runeterra:{
        decks:[
            //"CECQCAIDCQAQGBASAECAIEADAUBQCCINAQAQIJRHFU2AIAIBAMXACAIEAEAQGAYPAECQGBQCAEAQGMYBAUBQI", 
        ],
        rivals:[
            //{ summoner:"KumaOnKuma", tag: "Na1" }
        ]
    }
}

export const reducer = (state, action) => {
    switch(action.type) {
        case "add-deck":
            state.runeterra.decks.push(action.payload);
            return { ...state };
        
        case "add-rival":
            state.runeterra.rivals.push(action.payload);
            return {...state };

        case "set-user":
            return action.payload;
            
        default:
            return state;
    }
}