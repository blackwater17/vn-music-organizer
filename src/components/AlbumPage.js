import React from 'react'
import AlbumPageHeader from './AlbumPageHeader'
import SongResults from './SongResults'

class AlbumPage extends React.Component {

    render() {
        let album_name = this.props.match.params.album_name;        
        return (
            <div className="albumMainArea">
              <AlbumPageHeader album_name={album_name} />
              <SongResults type="Album" album_name={album_name}/>
            </div>
        )
}}

export default AlbumPage