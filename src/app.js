import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore';
import { addAllArtists } from './actions/artists';
import { addAllSongs } from './actions/songs'
import { addAllAlbums } from './actions/albums'
import { addGame } from './actions/games'

import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

export const current_playing = {
    sound: "",
    sound_title: ""
}

export const current_playlist = {
    songs: []
}

const store = configureStore();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


fetch("http://192.168.1.21:5000/get-songs-db").then((res) => {
    res.json().then((data) => {
        let unique_artists = []
        let unique_albums = []
       // data.songs=shuffle(data.songs)

        for (let i=0; i<data.songs.length; i++) {

            if (data.songs[i].artist === "") continue 

                    
            if (unique_artists.filter(e => e.artist_name === data.songs[i].artist).length === 0) {
                unique_artists.push({ artist_name: data.songs[i].artist})
            }


            if (unique_albums.filter(e => e.album_name === data.songs[i].album_name).length === 0) { 
                unique_albums.push({album_name: data.songs[i].album_name, artist_name:data.songs[i].artist, year: 2010, coverImagePath: data.songs[i].coverImagePath})
            }
        
        }
    
        store.dispatch(addAllArtists(unique_artists.sort((a, b) => (a.artist_name > b.artist_name) ? 1 : -1)))
        store.dispatch(addAllAlbums(unique_albums.sort((a, b) => (a.album_name > b.album_name) ? 1 : -1))) 
        store.dispatch(addAllSongs(data.songs.sort((a, b) => (a.song_title > b.song_title) ? 1 : -1)))
        
    })
    
})

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"))