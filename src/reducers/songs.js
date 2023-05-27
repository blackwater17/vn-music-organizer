let songsReducerDefaultState = [] 

const songsReducer = (state = songsReducerDefaultState, action) => {

    switch (action.type) {
        case "ADD_SONG":
            return [
                ...state,
                action.song 
            ]
        
        case "ADD_ALL_SONGS":
            return action.songs
            
        default:
            return state;
    }
}

export default songsReducer;