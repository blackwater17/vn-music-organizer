const gamesReducerDefaultState = []

const gamesReducer = (state = gamesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_GAME":
            return [
                ...state,
                action.game // obje.
            ]
            
        default:
            return state;
    }
}

export default gamesReducer;