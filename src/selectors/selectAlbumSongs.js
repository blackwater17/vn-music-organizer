
export default (songs, {album_name="", songs_page=1}) =>  { 
    if (songs_page.songs_page === undefined) songs_page =1
    else songs_page = songs_page.songs_page    
    let all_results = songs.filter((song) => {
        const isAlbumMatch = (song.album_name === album_name)
        return isAlbumMatch
    })
    return all_results
}