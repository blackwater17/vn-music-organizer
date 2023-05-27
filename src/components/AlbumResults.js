import React from 'react';
import { connect } from 'react-redux';
import selectAlbums from '../selectors/albums.js';
import selectArtistAlbums from '../selectors/selectArtistAlbums.js';
import AlbumResultBox from './AlbumResultBox'
import { setArtistName } from '../actions/filters'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
  


class AlbumResults extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(setArtistName(this.props.artist_name))
    }

    render() {

        return (

            (this.props.albums.length > 0) &&
                
            <div className="albums-full-container full-container">

                { (this.props.type === "artist_albums" || this.props.type === "all_albums" ) && <h1>Albums: </h1>}
                {this.props.type === "album_results" && <h1>Album results: </h1>}
                
                <div className="album-results">    
                
                    { this.props.type === "album_results" && this.props.albums.map((album) =>  <AlbumResultBox key={album.album_name} {...album } randomColor={getRandomColor()}  /> )} 
                    { this.props.type === "artist_albums" && this.props.artist_albums.map((album) =>  <AlbumResultBox key={album.album_name} {...album } randomColor={getRandomColor()}  /> )} 
                    { this.props.type === "all_albums" && shuffle(this.props.all_albums).slice(0,100).map((album) =>  <AlbumResultBox key={album.album_name} {...album } randomColor={getRandomColor()}  /> )} 
               
                </div>
            </div>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        all_albums: state.albums,
        albums: selectAlbums(state.albums, state.filters),
        artist_albums: selectArtistAlbums(state.albums, state.filters)
    }
}

export default connect(mapStateToProps)(AlbumResults);