let songsReducerDefaultState = [] // yani frontend 'Db'sinde BAŞTA  hangi itemler var?



const songsReducer = (state = songsReducerDefaultState, action) => {

    switch (action.type) {
        case "ADD_SONG":
            return [
                ...state,
                action.song // obje.
            ]
        

        case "ADD_ALL_SONGS":
            return action.songs
            
        
            
        default:
            return state;
    }
}

export default songsReducer;


