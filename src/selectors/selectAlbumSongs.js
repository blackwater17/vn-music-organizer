
export default (songs, {album_name="", songs_page=1}) =>  { //album name default "" olarak yap.. önemli...

    if (songs_page.songs_page === undefined) songs_page =1
    else songs_page = songs_page.songs_page    
    
    // bu sayfadaki salak problemi çöz.


    let all_results = songs.filter((song) => {
        const isAlbumMatch = (song.album_name === album_name)
        return isAlbumMatch
    })

    
    return all_results

}

