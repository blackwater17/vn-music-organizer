

export const addAlbum = (
    {
        artist_name = "Unknown_Artist_Name",
        album_name = "Unknown_Album_Name",
        song_year = "Unknown_Song_Year",
    } = {}
    ) => ({
        type: "ADD_ALBUM",
        album: {  
            artist_name,
            album_name,
            song_year
        }
        })

export const addAllAlbums = (
    albums = []
) => ({
    type: "ADD_ALL_ALBUMS",
    albums
})