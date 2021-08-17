import React from 'react'

import MainTopLine from './MainTopLine'
import ArtistResults from './ArtistResults'
import SongResults from './SongResults'
import AlbumResults from './AlbumResults'
import GameResults from './GameResults'



class MainArea extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="mainArea">

                {this.props.type === "liked" &&

                    <div> 
                        <MainTopLine />
                        <SongResults type="song_results" page_counter="liked" /> 
                    </div>
                
                }


                {this.props.type === "main" && 
                    <div>
                        <MainTopLine />
                        <ArtistResults type="artist_results" />
                        <SongResults type="song_results" page_counter="main"/>
                        <AlbumResults type="album_results" />
                        <GameResults />
                    </div>
            
            }
    

        </div>

        )
    }



}

export default MainArea;