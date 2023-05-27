export default (songs, { artist_name } ) =>  {
    let all_results
    all_results = songs.filter((song) => {
        if (song.artist_name === artist_name) return true
        return false
    })
    return all_results
}