import React from 'react';
import { NavLink } from 'react-router-dom';
import {current_playing, current_playlist} from '../app'
import { connect } from 'react-redux';

import { setAlbumName, setSongName, setPlayingArtist } from '../actions/filters'
import selectSongs from '../selectors/songs.js';


class AlbumResultBox extends React.Component {

    state = {
        myBackground: ""
    }


    updateSongDuration = (song) => {


        let timeStamp
   

        let totalSeconds = Math.floor(song.duration);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        

        // If you want strings with leading zeroes:
        minutes = String(minutes).padStart(1, "0");
        seconds = String(seconds).padStart(2, "0");
        timeStamp = minutes + ":" + seconds;



        document.querySelector(".music-duration").textContent = timeStamp
    
    }

    updateBottomPlayer = (currentTime, duration) => {

        document.querySelector(".slider").max = duration


        let timeStamp
        
        let totalSeconds = Math.floor(currentTime);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;


        minutes = String(minutes).padStart(1, "0");
        seconds = String(seconds).padStart(2, "0");
        timeStamp = minutes + ":" + seconds;

        document.querySelector(".current-song-time").textContent = timeStamp

        // now lets update the bar...

        duration = Math.floor(duration)
        
        //document.querySelector(".music-played-bar").style.width = ( (totalSeconds/duration)*100 ).toFixed(5) + "%"
        document.querySelector(".slider").value =  currentTime



    }


    playAnotherAlbumSong = () => {

        current_playlist.type = "mix"
        

        localStorage.setItem("active_index", 0) // 15de falan kalıyo yoksa, basınca 0lamak lazım.

        this.props.dispatch(setAlbumName(this.props.album_name))      // filter ayarlaması


        current_playlist.songs = this.props.album_all_songs  // for next-previous thing


        let rand = Math.floor(Math.random() * (this.props.album_all_songs.length + 1))
        
        try {current_playing.sound.pause()} catch(e) {} // bir şarkı çalarken başka şarkı açınca ilki dursun diye...

    
        current_playing.sound = new Audio("http://192.168.1.21:5000" + this.props.album_all_songs[rand].full_path.split("public")[1]) 

        current_playing.sound.sound_id = this.props.album_all_songs[rand]._id


        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()


        current_playing.sound.addEventListener("loadeddata", () => {
            this.updateSongDuration(current_playing.sound)
            this.props.dispatch(setSongName(this.props.album_all_songs[rand].song_title)) 
            this.props.dispatch(setPlayingArtist(this.props.album_all_songs[rand].artist))
        });
        
        
        
        current_playing.sound.addEventListener("ended", () => {
            this.playAnotherAlbumSong()
        })
        
        
        
        current_playing.sound.addEventListener("timeupdate", () => {
            this.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })


        document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/pause2.svg\")"
        document.getElementById("play-pause").style.backgroundPositionX = "50%";


        this.alreadyChanged = false 
    
    }


    getMyBackground = () => {

        if (this.props.coverImagePath === false) { // bi umut
            return false
            let bg = "url(\"/img/auto_album_covers/" + encodeURIComponent(this.props.artist_name) + encodeURIComponent(" _ ") + encodeURIComponent(this.props.album_name) + ".jpg\")"
            return bg
        }

        else {
     
            let anan = this.props.coverImagePath.split("\\public\\")[1]    
            let bg = "url(" + "\"" + "http://192.168.1.21:5000/" + encodeURIComponent(anan) + "\""  +   ")"
            return bg
        }

    }



    render() {


        return (
            <div className="album-result-container" >
          
                
                <div className="album-buttons-container">
                        <div className="album-play" onClick={() => this.playAnotherAlbumSong()} >    </div>
                        <div className="album-options">...</div>
                        <div className="album-love"></div>
                </div>


                <NavLink className="album-result-box" style={{backgroundColor:this.props.randomColor, backgroundImage: this.getMyBackground() }} to={"/album/" + this.props.album_name} > </NavLink>
                
                {/* old one : backgroundImage:"url(/img/auto_album_covers/" + encodeURIComponent(this.props.artist_name) + encodeURIComponent(" _ ") + encodeURIComponent(this.props.album_name) + ".jpg)", */}

               <NavLink className="artist-nav-link" to={"/album/" + this.props.album_name}  > <div>{this.props.album_name}</div></NavLink>    
                <div><NavLink className="artist-nav-link js-by-artist" to={"/artist/" + this.props.artist_name}  > <div> <span>by</span> {this.props.artist_name}</div> </NavLink>   </div>  
    
            </div>
        )
    }

    


        
    
}



const mapStateToProps = (state, ownProps) => {
    return {
        album_all_songs: selectSongs(state.songs, {album_name: ownProps.album_name, complete:true})
    }
}




export default connect(mapStateToProps)(AlbumResultBox);


    



