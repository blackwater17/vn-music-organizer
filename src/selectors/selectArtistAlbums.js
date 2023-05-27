
export default (songs, {artist_name, songs_page=1}) =>  {

    if (songs_page.songs_page === undefined) songs_page =1
    else songs_page = songs_page.songs_page    

    let all_results = songs.filter((song) => {
        const isArtistMatch = (song.artist_name === artist_name)
        return isArtistMatch
    })
    return all_results
}