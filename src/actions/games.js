

// bu aslında sadece bir argüman..
export const addGame = (
    {
        game_name = "Unknown_Game_Name",

    } = {}

    ) => ({
        type: "ADD_GAME",
        game: {
            
            game_name

        }
        })






