import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import selectSongs from '../selectors/songs.js';
import {current_playing, current_playlist} from '../app'


import { setSongName, setPlayingArtist } from '../actions/filters'




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



class ResultBox extends React.Component {

    constructor(props) {
        super(props)
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
    

    


    playAnotherArtistSong = () => {

        current_playlist.type = "mix"
        localStorage.setItem("active_index", 0) // 15de falan kalıyo yoksa, basınca 0lamak lazım.

        current_playlist.songs = shuffle(this.props.artist_all_songs)  // for next-previous thing  veee 22 22 22 gitmesin diye.


        let rand = Math.floor(Math.random() * (this.props.artist_all_songs.length + 1))

        
        try {current_playing.sound.pause()} catch(e) {} // bir şarkı çalarken başka şarkı açınca ilki dursun diye...

    
        current_playing.sound = new Audio("http://192.168.1.21:5000" + this.props.artist_all_songs[rand].full_path.split("public")[1]) 

        current_playing.sound.sound_id = this.props.artist_all_songs[rand]._id


        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()


        current_playing.sound.addEventListener("loadeddata", () => {
            this.updateSongDuration(current_playing.sound)
            this.props.dispatch(setSongName(this.props.artist_all_songs[rand].song_title)) 
            this.props.dispatch(setPlayingArtist(this.props.artist_all_songs[rand].artist))
        });
        
        
        
        current_playing.sound.addEventListener("ended", () => {
            this.playAnotherArtistSong()
        })
        
        
        
        current_playing.sound.addEventListener("timeupdate", () => {
            this.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })


        document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/pause2.svg\")"
        document.getElementById("play-pause").style.backgroundPositionX = "50%";


        this.alreadyChanged = false //
    


    }





    render() {
        return (

        <div className="artist-result-container" >
           
            <div className="artist-buttons-container">
                <div className="artist-play" onClick={() => this.playAnotherArtistSong()} >    </div>
                <div className="artist-options">...</div>
            </div>

            <NavLink className="artist-result-box" to={"artist/" + this.props.artist_name} style={{backgroundColor:this.props.randomColor,backgroundImage:"url(/img/artist_images/" + encodeURIComponent(this.props.artist_name) + "/1.webp)"}}> </NavLink>
            <NavLink className="artist-nav-link" to={"artist/" + this.props.artist_name}  > <div>{this.props.artist_name}</div> </NavLink>
       
        </div>
        
        )
    
    }
}


    
const mapStateToProps = (state, ownProps) => {
    return {
        artist_all_songs: selectSongs(state.songs, {artist_name: ownProps.artist_name, complete:true})
    }
}




export default connect(mapStateToProps)(ResultBox);


    
    