

// bu aslında sadece bir argüman..
export const addSong = (
    {
        artist_name = "Unknown_Artist_Name",
        song_name = "Unknown_Song_Name",
        song_album = "Unknown_Song_Album",
        id = "unknown_id",
        full_path = "unknown_path",
        liked = "unknown"

    } = {}

    ) => ({
        type: "ADD_SONG",
        song: {
            
            artist_name,
            song_name,
            song_album,
            id,
            full_path,
            liked

        }
        })




                



export const addAllSongs = (
    
        songs

     = {}

    ) => ({
        type: "ADD_ALL_SONGS",
        songs
        })


        
        



