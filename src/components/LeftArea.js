import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { setSearchTerm } from '../actions/filters'
import { connect } from 'react-redux';

class LeftArea extends React.Component {

    resetForm = (e) => {
     
        if (window.location.href.endsWith(":8081/")) {  // eğer anasayfadaysam , daha iyi bi yolunu bul
            e.preventDefault()
            this.props.dispatch(setSearchTerm(""))
            document.getElementById("search-text").value = ""
        }
        
    }

    


    render() {

        return (
            <div className="leftArea" >

                <div className="three-dots-area"> <div>...</div> </div>
        


                <ul className="main-nav-ul">
        
                    {/* <li> <img src="/img/svgs/home.svg" /> <div>Home</div> </li> */}
                    <li> <NavLink to="/" exact={true} onClick={this.resetForm}> <img src="/img/svgs/home.svg" /> <div>Home</div></NavLink>   </li>
                    
                    {/* <li> <img src="/img/svgs/browse.svg" /> <div>Browse</div> </li> */}
                    <li>  <NavLink to="/browse" > <img src="/img/svgs/browse.svg" /> <div>Browse</div></NavLink>   </li>
                    
                    {/* <li> <img src="/img/svgs/radio.svg" /> <div id="radio">Radio</div></li> */}
                    <li> <NavLink to="/radio" > <img src="/img/svgs/radio.svg" /> <div>Radio</div></NavLink>   </li>
        
                </ul>
        
        
                <div className="library-title">YOUR LIBRARY</div>
        
                <ul className="library-nav-ul">
                    <li>  <NavLink className="nav-link" to="/made-for-you" > <div>Made for You</div></NavLink>   </li>
                    <li>  <NavLink className="nav-link" to="/recent" > <div>Recently Played</div></NavLink>   </li>
                    <li>  <NavLink className="nav-link" to="/liked" > <div>Liked Songs</div></NavLink>   </li>
                    <li>  <NavLink className="nav-link" to="/artists" > <div>Artists</div></NavLink>   </li>
                    <li>  <NavLink className="nav-link" to="/albums" > <div>Albums</div></NavLink>   </li>
                    <li>  <NavLink className="nav-link" to="/OSTs" > <div>Game Soundtracks</div></NavLink>   </li>
        
                </ul>
        
                <div className="library-title">PLAYLISTS</div>
        
                <ul className="library-nav-ul playlist-nav-ul">
                    <li> Tatlı Huzur </li>
                    <li> Souls Series </li>
                    <li> Ambiance Sounds </li>
                    <li> Best of 2020 </li>
                </ul>
        
        
        
                <div className="left-album-cover"></div>
    
    
    
    
            </div>
    
        )
    }


}



const mapDispatchToProps = dispatch => ({
    dispatch                // ← Add this
 })
 
 export default connect(null, mapDispatchToProps)(LeftArea)
