import React from 'react'


import ArtistResults from './ArtistResults'
import MainTopLine from './MainTopLine'

const MainArea = () => (


    <div className="mainArea">
        <MainTopLine />
        <ArtistResults type="all_artists" />
    </div>
)

export default MainArea;