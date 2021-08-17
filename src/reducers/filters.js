const filtersReducerDefaultState = {search_term: "", songs_page: 1, liked_songs_page: 1, sound_file:"", album_name: "", artist_name: "", song_name: ""} // baska seyler de eklenebilirdi.

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "EDIT_SEARCH_TERM":
            return {
                ...state,
                search_term: action.search_term,
            }

        case "SET_ALBUM_NAME":
            return {
                ...state,
                album_name: action.album_name,
            }

        case "SET_ARTIST_NAME":
            return {
                ...state,
                artist_name: action.artist_name,
            }

        case "SET_PLAYING_ARTIST":
            return {
                ...state,
                playing_artist: action.playing_artist
            }
    

        case "SET_SONGS_PAGE":
            return {
                ...state,
                songs_page: action.songs_page,
            }
        
        case "SET_LIKED_PAGE":
            return {
                ...state,
                liked_songs_page: action.liked_songs_page
            }

        case "SET_SONG_NAME":
            return {
                ...state,
                song_name: action.song_name
            }

        case "SET_CURRENT_PLAYLIST":
            return {
                current_playlist: action.current_playlist
            }
        
            
        default:
            return state;
    }
}

export default filtersReducer;