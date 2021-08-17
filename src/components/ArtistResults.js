import React from 'react';

import { connect } from 'react-redux';
import selectArtists from '../selectors/artists.js';
import ArtistResultBox from './ArtistResultBox'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }




class ArtistResults extends React.Component {

    state = {
        page: 1
    }

    artir_page = () => {

        this.props.dispatch(setPageNumber( { page: this.state.page+1 } ))
        
        this.setState((prevState) => ({
            page: prevState.page+1
        }))
      
    }






    render() {

        return (

            this.props.artists.length > 0  &&
                
            <div className="artists-full-container full-container">
                <h1>Artists: </h1>

                <div className="artist-results">    

                    { (this.props.type === "artist_results" || this.props.type === "" ) && this.props.artists.map((artist) =>  <ArtistResultBox key={artist.artist_name} {...artist } randomColor={getRandomColor()}  /> )} 
                    {this.props.type != "artist_results" && this.props.allArtists.map((artist) =>  <ArtistResultBox key={artist.artist_name} {...artist } randomColor={getRandomColor()}  /> )} 

                </div>
            </div>
        
        )
    }

}


// direkt artistleri göndermiyoz, bide filter işleminden geçirip onu gönderiyoz.

const mapStateToProps = (state) => {
    return {
        artists: selectArtists(state.artists, state.filters),
        allArtists: state.artists
    }
}




export default connect(mapStateToProps)(ArtistResults);

