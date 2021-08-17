import React from 'react'



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  


class AlbumPageHeader extends React.Component {



    render() {

        return (

            <div className="album-page-header-container">
            
                <div className="album-page-header">

                    <div className="big-album-cover" style={{backgroundColor:getRandomColor()}} >

                    </div>

                    <div className="album-infos-container">
                        <div className="album">ALBUM</div>
                        <div className="album-name">{this.props.album_name}</div>
                        <div className="bottom-infos">2004 - 14 songs, 56 min 49 sec</div>
                    </div>


                </div>

                <div className="album-page-header-buttons">
                    <div className="listen-album">LISTEN</div>
                    <div className="love-album"></div>
                    <div className="album-options">...</div>
                </div>

            </div>


        )
    }
}


export default AlbumPageHeader;