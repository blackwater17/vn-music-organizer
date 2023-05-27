import React from 'react'
import ArtistPageHeader from './ArtistPageHeader'
import AlbumResults from './AlbumResults'

class ArtistPage extends React.Component {

    render() {

        let artist_name = this.props.match.params.artist_name;
        
        return (
            <div className="artistMainArea">
              <ArtistPageHeader artist_name={artist_name} />
              <AlbumResults type="artist_albums" artist_name={artist_name}/>
              {/* <SongResults type="artist_results" /> */}
            </div>
        )
}}

export default ArtistPage