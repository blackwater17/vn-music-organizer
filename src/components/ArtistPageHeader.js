import React from 'react'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
class ArtistPageHeader extends React.Component {

    render() {

        return (
            
            <div className="artist-page-header-container">
                <div className="artist-page-header" style={{backgroundColor:getRandomColor()}} >
                    <div className="artist-infos-container">
                        <div className="artist">{this.props.artist_name}</div>
                        <div className="artist-listen-count">671,116 monthly listeners</div>
                    </div>
                </div>
                <div className="artist-page-header-buttons">
                    <div className="mix-artist">MIX</div>
                    <div className="love-artist"></div>
                    <div className="artist-options">...</div>
                </div>
            </div>
        )
    }
}

export default ArtistPageHeader;