const albumsReducerDefaultState = []

const albumsReducer = (state = albumsReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_ALBUM":
            return [
                ...state,
                action.album // obje.
            ]
            
        case "ADD_ALL_ALBUMS":
            return action.albums
            
            
        default:
            return state;
    }
}

export default albumsReducer;