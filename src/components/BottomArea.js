import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { current_playing ,current_playlist} from '../app'
import { setSongName, setPlayingArtist } from '../actions/filters' // daha pratikmiş lan

class BottomArea extends React.Component  {

    state = {
        isPlaying:true
    }

    toggle_play = () => {

        if (current_playing.sound === "") return false 

        if (this.state.isPlaying === false){
            current_playing.sound.play()
            document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/pause2.svg\")"
            document.getElementById("play-pause").style.backgroundPositionX = "50%";

            this.setState(() => ({
                isPlaying: true
            }))
        }

        else {
            current_playing.sound.pause()
            document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/play5.svg\")"
            document.getElementById("play-pause").style.backgroundPositionX = "62%";
    
            this.setState(() => ({
                isPlaying: false
            })) 
        }
    }

    handler = (e) => {

        let song_duration
        let song1 = parseInt(document.querySelector(".music-duration").textContent.split(":")[0])*60
        let song2 = parseInt(document.querySelector(".music-duration").textContent.split(":")[1])
        song_duration = song1 + song2
        let current_time_seconds = document.querySelector(".slider").value

        try {
            current_playing.sound.currentTime = current_time_seconds
        }
        catch(e) { } 
    }

    toggleRepeat = () => {

        if (document.getElementById("repeat-song").style.filter === "") { 
            document.getElementById("repeat-song").style.filter = "invert(49%) sepia(89%) saturate(2575%) hue-rotate(321deg) brightness(96%) contrast(96%)"
        }

        else {
            document.getElementById("repeat-song").style.filter = ""
        }
    }

    toggleShuffle = () => {

        if (document.getElementById("shuffle").style.filter === "") { 
            document.getElementById("shuffle").style.filter = "invert(49%) sepia(89%) saturate(2575%) hue-rotate(321deg) brightness(96%) contrast(96%)"
        }

        else {
            document.getElementById("shuffle").style.filter = ""
        }
    }

    showVolumeBar = () => {
        document.getElementById("volume-control").style.display = "block"
    }

    hideVolumeBar = () => {
        document.getElementById("volume-control").style.display = "none"
    }

    changeVolume = () => {
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
    }

    playPrevious = () => {

        let previous_playing_index
        previous_playing_index = parseInt(localStorage.getItem("active_index")) - 1


        if (previous_playing_index < 1) return false

        localStorage.setItem("active_index", previous_playing_index)

        if (current_playing.sound.paused) this.toggle_play() 
        try {current_playing.sound.pause()} catch(e) {} 

        if (current_playlist.type === "mix") previous_playing_index = (previous_playing_index % current_playlist.songs.length)+1

        current_playing.sound = new Audio("http://192.168.1.21:5000" + current_playlist.songs[previous_playing_index-1].full_path.split("public")[1]) 
        current_playing.sound.sound_id = current_playlist.songs[previous_playing_index-1]._id

        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()


        current_playing.sound.addEventListener("loadeddata", () => {
            this.updateSongDuration(current_playing.sound)           
        });

        current_playing.sound.addEventListener("timeupdate", () => {
            this.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })

        this.props.dispatch(setSongName(current_playlist.songs[previous_playing_index-1].song_title))
        this.props.dispatch(setPlayingArtist(current_playlist.songs[previous_playing_index-1].artist)) 
    }


    playNext = () => {

        console.log(current_playlist);
        let next_playing_index
        next_playing_index = parseInt(localStorage.getItem("active_index")) + 1
        
        if (isNaN(next_playing_index)) {
            next_playing_index = 1
        }

        if (current_playlist.type === "default") {
            if (next_playing_index > current_playlist.songs.length) return false  // boundary limit
        }

        localStorage.setItem("active_index", next_playing_index)

        if (current_playing.sound.paused) this.toggle_play() 
        try {current_playing.sound.pause()} catch(e) {}
        
        if (current_playlist.type === "mix") next_playing_index = (next_playing_index % current_playlist.songs.length)+1 

        current_playing.sound = new Audio("http://192.168.1.21:5000" + current_playlist.songs[next_playing_index-1].full_path.split("public")[1]) 
        current_playing.sound.sound_id = current_playlist.songs[next_playing_index-1]._id
        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()

        current_playing.sound.addEventListener("loadeddata", () => {
            this.updateSongDuration(current_playing.sound)           
        });

        current_playing.sound.addEventListener("timeupdate", () => {
            this.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })

    
        this.props.dispatch(setSongName(current_playlist.songs[next_playing_index-1].song_title))
        this.props.dispatch(setPlayingArtist(current_playlist.songs[next_playing_index-1].artist)) 
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

        duration = Math.floor(duration)
        document.querySelector(".slider").value =  currentTime
    }



    onLoveClick = () => {
       
        fetch("http://192.168.1.21:5000/add-liked-song?_id=" + current_playing.sound.sound_id).then((res) => {
            res.json().then((data) => {
                console.log('Song liked.');
            })
        }).then((res2) => {
            // this.update_songs_db()
        })

        document.querySelector(".mid-love").style.filter = "invert(51%) sepia(26%) saturate(6543%) hue-rotate(322deg) brightness(97%) contrast(93%)"
    }


    componentDidMount() {
        
        document.querySelector(".slider").addEventListener("input", (e) => {
            this.handler(e)
        })
       

    }

    componentDidUpdate() {
        document.querySelector(".mid-love").style.filter = ""
    }


    render() {

        return (
            <div className="bottomArea">

                <div className="prevPlayNext">
                    <div className="button step" id="step-backward" onClick={() => this.playPrevious()}>   </div>
                    <div className="button" id="play-pause" onClick={this.toggle_play}>         </div>
                    <div className="button step" id="step-forward" onClick={() => this.playNext()}>     </div>
                </div>

                <div className="bottom-middle"> 

                    <div className="mid-buttons">
                        <div className="mid-love" onClick={this.onLoveClick}></div>
                        <div className="mid-add"></div>
                        <div className="mid-lyrics"></div>
                    </div>
                
                    <div className="bottom-mid-up">

                        <NavLink to="/some_song_name_here" >  <div className="music-name upper-line" > {this.props.song_name} </div> </NavLink>  
                        <div className="upper-line middle-dot">·</div>
                        <NavLink to="/some_artist_name_here" > <div className="music-artist upper-line"> {this.props.playing_artist} </div> </NavLink>

                    </div>

                    <div className="bottom-mid-down">

                        <span className="current-song-time">0:00</span>
                        
                        <input type="range" min="0" max="100" defaultValue="0" className="slider" id="myRange" /> 

                        <span className="music-duration">0:00</span>
                    </div>
                </div>


                <div className="bottom-right-buttons">
                        <input type="range" min="0" max="100" defaultValue="80" id="volume-control" onInput={this.changeVolume} onMouseOut={this.hideVolumeBar} /> 
                        <div id="repeat-song" onClick={this.toggleRepeat} ></div>
                        <div id="shuffle" onClick={this.toggleShuffle}></div>
                        <div id="volume" onMouseEnter={this.showVolumeBar}  ></div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
     return {
         song_name: state.filters.song_name,
         playing_artist: state.filters.playing_artist
     }
}

export default connect(mapStateToProps)(BottomArea);