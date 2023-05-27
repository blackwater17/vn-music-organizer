import React from 'react';
import { connect } from 'react-redux';
import {current_playing, current_playlist} from '../app'
import { NavLink } from 'react-router-dom';
import { setSongName, setPlayingArtist } from '../actions/filters'
import configureStore from '../store/configureStore';
import { addAllArtists } from '../actions/artists';
import { addAllSongs } from '../actions/songs'
import { addAllAlbums } from '../actions/albums'

class SongResultBox extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        audio:new Audio("http://192.168.1.21:5000" + this.props.full_path.split("public")[1]),
        isPlaying:false      
    }

    onClick = () => {
    
        try {current_playing.sound.pause()} catch(e) {}
        
        current_playing.sound = this.state.audio
        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()

        current_playing.sound.sound_id = this.props._id
  

        current_playing.sound.addEventListener("ended", () => {
            if (document.getElementById("repeat-song").style.filter != "") current_playing.sound.play()
            else {

                if (this.props.alreadyChanged === false) this.props.changeSong()       
                
            }

        })


        this.props.updateSongDuration(current_playing.sound)

        current_playing.sound.addEventListener("timeupdate", () => {
            // console.log(current_playing.sound.currentTime);
            this.props.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })

        document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/pause2.svg\")"
        document.getElementById("play-pause").style.backgroundPositionX = "50%";

        // global set state
        this.props.dispatch(setSongName(this.props.song_title))
        this.props.dispatch(setPlayingArtist(this.props.artist))
        this.props.update_active_index(this.props.index)

        localStorage.setItem("active_index", this.props.index)
        this.props.updatePlaylist()
        current_playlist.type = "default"
    }

    update_songs_db = () => {

        let store = configureStore();
        store.dispatch(addAllArtists([]))
        store.dispatch(addAllAlbums([]))
        store.dispatch(addAllSongs([]))

        fetch("http://192.168.1.21:5000/get-songs-db").then((res) => {
            res.json().then((data) => {

            let unique_artists = []
            let unique_albums = []

            for (let i=0; i<data.songs.length; i++) {
                        
                if (unique_artists.filter(e => e.artist_name === data.songs[i].artist).length === 0) {
                    unique_artists.push({ artist_name: data.songs[i].artist})
                }


                if (unique_albums.filter(e => e.album_name === data.songs[i].album_name).length === 0) {
                    unique_albums.push({album_name: data.songs[i].album_name, artist_name:data.songs[i].artist, year: 2010})
                }
            }
        
            store.dispatch(addAllArtists(unique_artists))
            store.dispatch(addAllAlbums(unique_albums))
            store.dispatch(addAllSongs(data.songs))
    })
})
    }


    onLoveClick = (div_index) => {

        fetch("http://192.168.1.21:5000/add-liked-song?_id=" + this.props._id).then((res) => {
            res.json().then((data) => {
                console.log('Song is liked.');
            })
        }).then((res2) => {
            this.update_songs_db()
        })


        if (document.querySelectorAll(".love-area")[div_index].style.filter === "invert(51%) sepia(26%) saturate(6543%) hue-rotate(322deg) brightness(97%) contrast(93%)") {
            document.querySelectorAll(".love-area")[div_index].style.filter = "invert(29%) sepia(16%) saturate(2%) hue-rotate(314deg) brightness(94%) contrast(95%)"
        }

        else document.querySelectorAll(".love-area")[div_index].style.filter = "invert(51%) sepia(26%) saturate(6543%) hue-rotate(322deg) brightness(97%) contrast(93%)"
    }


    updateLoveBox = (div_index) => {
        if (this.props.liked === true) {
            document.querySelectorAll(".love-area")[div_index-1].style.filter = "invert(51%) sepia(26%) saturate(6543%) hue-rotate(322deg) brightness(97%) contrast(93%)"
        }        
    }


    componentDidMount() {

        this.updateLoveBox(this.props.index)

        document.querySelectorAll(".love-area").forEach((div) => {
            if (window.location.href.includes("/liked")) {
                div.style.filter = "invert(51%) sepia(26%) saturate(6543%) hue-rotate(322deg) brightness(97%) contrast(93%)"
            }
        })
    }

    render() {

        return (

            <div className="song-result-box" >
               
                <div className="id-area"  onClick={() => this.onClick()}   > {this.props.index} </div>
                <div className="love-area" onClick={() => this.onLoveClick(this.props.index-1)}> </div>            
                <div className="song-title-area" >  <span>{this.props.song_title}</span></div>
                <div className="song-buttons-container">
                    <div className="add-to-playlist">+</div>
                    <div className="song-options">...</div>
                </div>

                <NavLink className="song-artist-area" to={"/artist/" + this.props.artist} > <span>{this.props.artist}</span>  </NavLink>      
                <NavLink className="album-name-area" to={"/album/" + this.props.album_name} > <span>{this.props.album_name} </span></NavLink>
            </div>
        )
    }
}

export default connect()(SongResultBox);