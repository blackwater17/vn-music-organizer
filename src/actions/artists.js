
// bu aslında sadece bir argüman..
export const addArtist = (
    {
        artist_name = "Unknown_Artist_Name",

    } = {}

    ) => ({
        type: "ADD_ARTIST",
        artist: {
            
            artist_name,


        }
        })





export const addAllArtists = (
    
    artists = []

) => ({

    type: "ADD_ALL_ARTISTS",
    artists
    
})


    
    




