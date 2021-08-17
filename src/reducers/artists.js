const artistsReducerDefaultState = []

const artistsReducer = (state = artistsReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_ARTIST":
            return [
                ...state,
                action.artist // obje.
            ]

        // case "ADD_ALL_ARTISTS":
        // return [
        //     action.artists // objeler.
        // ]
            

        case "ADD_ALL_ARTISTS":
            return action.artists

        default:
            return state;
    }
}







export default artistsReducer;