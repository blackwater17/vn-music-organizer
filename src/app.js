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

            if (data.songs[i].artist === "") continue // bunları dbden temizle, bu geçici

            
                    
            if (unique_artists.filter(e => e.artist_name === data.songs[i].artist).length === 0) {
                unique_artists.push({ artist_name: data.songs[i].artist})
            }


            if (unique_albums.filter(e => e.album_name === data.songs[i].album_name).length === 0) { // farklı sürümde varsa sadece birini ekler ....
                unique_albums.push({album_name: data.songs[i].album_name, artist_name:data.songs[i].artist, year: 2010, coverImagePath: data.songs[i].coverImagePath})
            }
        
        }
    

        store.dispatch(addAllArtists(unique_artists.sort((a, b) => (a.artist_name > b.artist_name) ? 1 : -1)))
        store.dispatch(addAllAlbums(unique_albums.sort((a, b) => (a.album_name > b.album_name) ? 1 : -1))) // yakında dateye göre falanda olcak..
        store.dispatch(addAllSongs(data.songs.sort((a, b) => (a.song_title > b.song_title) ? 1 : -1)))
        
        
        



    })
    

})



/*
fetch("http://192.168.1.21:5000/add-liked-song?_id=test1234").then((res) => {
    res.json().then((data) => {
        console.log('gitti.');
    })
})
*/






const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);






ReactDOM.render(jsx, document.getElementById("app"))










/*
store.dispatch(addGame({game_name: "Resident Evil 4"}))
store.dispatch(addGame({game_name: "Need for Speed: Hot Pursuit"}))
store.dispatch(addGame({game_name: "Dark Souls III"}))
store.dispatch(addGame({game_name: "Mortal Shell"}))
*/


// console.log(store.getState())









/*

const options = ["opr1", "ys2", "aşlskd"]


class Header extends React.Component {
    
    render() {
        return (
            <div> 
                <h1>This is the title?</h1>
            </div>
        )
    }
}

class Options extends React.Component {

    removeAll() {
        alert("tikladndi.")
    }

    render() {
        return (
            <div>
                <div>Here are all the options: </div>
                <div>uzunluk: {this.props.options.length}</div>
                
                {this.props.options.map((opt) => {
                    return <p key={opt}>{opt}</p>
                } )}

                <button onClick={this.removeAll}>Remove All</button>
                
                
                
                
               
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>1. opsiyon</li>
                    <li>2. opsion</li>
                </ul>
            </div>
        )
    }
}


class AddOptions extends React.Component {
    render() {
        return (
            <div>Add options:</div>
        )
    }
}


class MainForm extends React.Component {

    onSubmitted(e) {
        e.preventDefault()
    
        console.log('statik');
        console.log(e.target.elements.maint.value)
    }

    render() {
        return (
            <div>
                <form name="main-form" onSubmit={this.onSubmitted}>
                    <input name="maint" type="text"></input>
                    <button>Submit!</button>
                </form>
            </div>
        )
    }
}





const jsx = (
    <div>
        <Options options={options}/>
        <AddOptions />
        <MainForm />

    </div>
)


let main_div = document.getElementById("app")

ReactDOM.render(jsx, main_div)

*/