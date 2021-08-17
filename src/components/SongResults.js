import React from 'react';

import { connect } from 'react-redux';
import selectSongs from '../selectors/songs.js';
import SongResultBox from './SongResultBox'
import { setAlbumName, setSongsPage, setLikedPage, setSongName, setPlayingArtist, setCurrentPlaylist } from '../actions/filters'
import selectAlbumSongs from '../selectors/selectAlbumSongs.js';
import {current_playing, current_playlist} from '../app'



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

class SongResults extends React.Component {

    constructor(props) {
        super(props);

    }
    
    state = {
        songs_page: 1,
        liked_songs_page: 1,
        active_index: -1,
        loved_ids: [] // renklendirme için lazım
    }
    

    alreadyChanged = false


    increase_page = () => {


        if (this.props.page_counter === "main") {

            if ((this.state.songs_page * 10) >= this.props.all_results_length) return false

            this.props.dispatch(setSongsPage( this.state.songs_page+1 ))

            this.setState((prevState) => ({
                songs_page: prevState.songs_page+1
            }))

        }

        else if (this.props.page_counter === "liked") {

            if ((this.state.liked_songs_page * 10) >= this.props.all_results_length) return false

            this.props.dispatch(setLikedPage(this.state.liked_songs_page+1 ))
            
            this.setState((prevState) => ({
                liked_songs_page: prevState.liked_songs_page+1
            }))



        }

        // this.update_styles(this.state.playing_index)


      
    }

    decrease_page = () => {

        if (this.props.page_counter === "main") {

            if (this.state.songs_page === 1) return false

            this.props.dispatch(setSongsPage(this.state.songs_page-1 ))
            
            this.setState((prevState) => ({
                songs_page: prevState.songs_page-1
            }))

            
        }


        else if (this.props.page_counter === "liked") {
            if (this.state.liked_songs_page === 1) return false

            this.props.dispatch(setLikedPage(this.state.liked_songs_page-1 ))
            
            this.setState((prevState) => ({
                liked_songs_page: prevState.liked_songs_page-1
            }))
        }

        // this.update_styles(this.state.playing_index)

       

      
    }

    update_active_index = (idx) => {
        this.setState(() => ({
            active_index: idx
        }))
    }

    get_active_index = () => {
        return this.state.active_index
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


    
    changeSong = () => { // bir şarkı bittiğinde çalışır &  only works if repeat is not activated.


        this.alreadyChanged = true // 
        
        let next_playing_index = this.state.active_index + 1

        try {current_playing.sound.pause()} catch(e) {} // 

        try { current_playing.sound = new Audio("http://192.168.1.21:5000" + this.props.album_songs[next_playing_index-1].full_path.split("public")[1]) }
        catch(e) {current_playing.sound = new Audio("http://192.168.1.21:5000" + this.props.songs[next_playing_index-1].full_path.split("public")[1]) }  

        current_playing.sound.currentTime = 0; // optional
        current_playing.sound.volume = Math.pow(document.getElementById("volume-control").value, 2) / 10000
        current_playing.sound.play()


        current_playing.sound.addEventListener("loadeddata", () => {
            this.updateSongDuration(current_playing.sound)
            
            try { this.props.dispatch(setSongName(this.props.album_songs[next_playing_index-1].song_title)) }
            catch(e) { this.props.dispatch(setSongName(this.props.songs[next_playing_index-1].song_title)) }
            
            try { this.props.dispatch(setPlayingArtist(this.props.album_songs[next_playing_index-1].artist)) }
            catch(e) { this.props.dispatch(setPlayingArtist(this.props.songs[next_playing_index-1].artist)) }
            
        });
        
        

        current_playing.sound.addEventListener("ended", () => {
            this.changeSong()
        })

        
        
        current_playing.sound.addEventListener("timeupdate", () => {
            this.updateBottomPlayer(current_playing.sound.currentTime, current_playing.sound.duration)
        })


        document.getElementById("play-pause").style.backgroundImage = "url(\"/img/svgs/pause2.svg\")"
        document.getElementById("play-pause").style.backgroundPositionX = "50%";


        // global set state


        this.update_active_index(next_playing_index)
        //console.log(this.state.currentPlaylist)

        this.alreadyChanged = false // 

        




    }


    updatePlaylist = () => {
      
         if (this.props.album_songs.length > 0) current_playlist.songs = this.props.album_songs  
         else current_playlist.songs = this.props.songs 
            
    }

    pluck = (array, key) => {
        return array.map(function(item) { return item[key]; });
    }



     componentDidMount() {      // eğer bir albüm içindeki şarkıları gösteriyorsak , sadece onun için lazım/geçerli düşün. && component mount edildi ! filter için lazım bu..
         this.props.dispatch(setAlbumName(this.props.album_name))      
         localStorage.setItem("active_index", null)
         //  this.props.dispatch(setAlbumName(this.props.album_name))                
     }

     componentDidUpdate(prevState, props) { // state değişti ! -- problem: her değişiklikte yapıyo, ben sadece active değiştiğinde yapmasını istiyom.
        // shitty code , çarpışıyor bottom box koduyla??

     





        try {

        let real_idx = this.state.active_index-1 // real idx = şu an calan şarkının indexi?
        real_idx = parseInt(localStorage.getItem("active_index"))-1

        
        for (let i=0; i<99; i++) { // 10du. sayıyı napcam bilmiyom

            let current_song_box = document.querySelectorAll(".song-result-box")[i]
            let current_title_area = document.querySelectorAll(".song-title-area")[i]
            let current_id_area = document.querySelectorAll(".id-area")[i]



            if (((this.state.songs_page-1)*10)+i === real_idx) {
        
                current_title_area.style.color = "#ef5466"
                current_id_area.style.backgroundImage = "url(/img/svgs/pause2.svg)"

                if (props.songs_page != this.state.songs_page) {
                    current_id_area.style.backgroundImage = "url(/img/playing.gif)"
                } // sayfa değişimi durumu için , istisna durum.


                current_id_area.style.fontSize = "0"

                    
                current_song_box.addEventListener("mouseenter", () => {
                    current_id_area.style.backgroundImage = "url(/img/svgs/pause2.svg)"
                    current_id_area.style.fontSize = "0px"
                })

                current_song_box.addEventListener("mouseleave", () => {
                    current_id_area.style.fontSize = "0px"
                    current_id_area.style.backgroundImage = "url(/img/playing.gif)"
                })
                
            }

            else {
    
                current_id_area.style.backgroundImage = ""
                current_id_area.style.fontSize = "19px"
                current_title_area.style.color = "#191919"
            

                current_song_box.addEventListener("mouseenter", () => {
                    current_id_area.style.backgroundImage = "url(/img/svgs/play4.svg)"
                    current_id_area.style.fontSize = "0px"
                })

                current_song_box.addEventListener("mouseleave", () => {
                    current_id_area.style.fontSize = "19px"
                    current_id_area.style.backgroundImage = ""
                })

            
            }
        }
        }

        catch(e) {}




     }



    render() {
        
        return (

            (this.props.songs.length > 0 || this.props.type === "album_songs") &&

            <div className="songs-full-container full-container">
                                
                {this.props.type === "song_results" && <h1>Song results: </h1>}
                
                {this.props.type === "song_results" && 
                    <div className="results-pre-next" >
                        <a className="previous-page" onClick={this.decrease_page} >&lt;</a>
                        <a className="next-page" onClick={this.increase_page} >&gt;</a>    
                    </div>
                }

                
              
                {this.props.type === "song_results" && this.props.songs.map((song) =>  <SongResultBox updatePlaylist={this.updatePlaylist} alreadyChanged={this.alreadyChanged} updateBottomPlayer={this.updateBottomPlayer} updateSongDuration={this.updateSongDuration} changeSong={this.changeSong} get_active_index={this.get_active_index} update_active_index={this.update_active_index} handler={this.handler} key={song._id} {...song } randomColor={getRandomColor()} index={this.props.songs.indexOf(song)+1 + ((this.state.songs_page - 1) * 10)} /> )} 
                {this.props.type === "Album" && this.props.album_songs.map((song) =>  <SongResultBox updatePlaylist={this.updatePlaylist} alreadyChanged={this.alreadyChanged} updateBottomPlayer={this.updateBottomPlayer} updateSongDuration={this.updateSongDuration} changeSong={this.changeSong}  get_active_index={this.get_active_index} update_active_index={this.update_active_index} handler={this.handler} key={song._id} {...song } randomColor={getRandomColor()} index={this.props.album_songs.indexOf(song)+1} /> )} 
       
                {/* song_result için db olarak tüm şarkıları, albüm için albüm şarkılarını kullanacak, çok önemli.. */}

            </div>
        )
    }
}


// direkt songlari göndermiyoz, bide filter işleminden geçirip onu gönderiyoz.

const mapStateToProps = (state) => {
    return {
        songs: selectSongs(state.songs, state.filters).all_results,
        album_songs:  selectAlbumSongs(state.songs, state.filters),
        all_results_length: selectSongs(state.songs, state.filters).all_results_length,
        complete_songs: state.songs
    }
}




export default connect(mapStateToProps)(SongResults);