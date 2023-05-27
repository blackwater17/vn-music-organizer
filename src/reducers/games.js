const gamesReducerDefaultState = []

const gamesReducer = (state = gamesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_GAME":
            return [
                ...state,
                action.game
            ]
            
        default:
            return state;
    }
}

export default gamesReducer;