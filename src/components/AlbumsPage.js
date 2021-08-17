import React from 'react'


import AlbumResults from './AlbumResults'
import MainTopLine from './MainTopLine'

const MainArea = () => (


    <div className="mainArea">
        <MainTopLine />
        <AlbumResults type="all_albums" />
    </div>
)

export default MainArea;