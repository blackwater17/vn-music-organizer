import { createStore, combineReducers } from 'redux';
import artistsReducer from '../reducers/artists'
import songsReducer from '../reducers/songs';
import albumsReducer from '../reducers/albums';
import gamesReducer from '../reducers/games';
import filtersReducer from '../reducers/filters';

export default () => {

    const store = createStore(
        combineReducers({
            artists: artistsReducer,
            songs: songsReducer,
            albums: albumsReducer,
            games: gamesReducer,
            filters: filtersReducer,

        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}