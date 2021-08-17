
export default (songs, {artist_name, songs_page=1}) =>  {   // bu fonksiyonu biz bir artist objesi ile çağrıyıoruz. bu göksel olur deniz tekin olur vs.. işte o objeyi constaskdja ettik.

    if (songs_page.songs_page === undefined) songs_page =1
    else songs_page = songs_page.songs_page    
    
    // bu sayfadaki salak problemi çöz.



    let all_results = songs.filter((song) => {

        const isArtistMatch = (song.artist_name === artist_name)

        return isArtistMatch
    })

    
    return all_results

}
