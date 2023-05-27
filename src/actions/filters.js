export const setSearchTerm = (search_term = "") => ({
    type: "EDIT_SEARCH_TERM",
    search_term
})

export const setSongsPage = (songs_page) => ({
    type: "SET_SONGS_PAGE",
    songs_page,
})

export const setLikedPage = (liked_songs_page) => ({
    type: "SET_LIKED_PAGE",
    liked_songs_page,
})

export const setAlbumName = (album_name) => ({
    type: "SET_ALBUM_NAME",
    album_name
})

export const setArtistName = (artist_name) => ({
    type: "SET_ARTIST_NAME",
    artist_name
})

export const setSongName = (song_name) => ({
    type: "SET_SONG_NAME",
    song_name
})

export const setPlayingArtist = (playing_artist) => ({
    type: "SET_PLAYING_ARTIST",
    playing_artist
})

export const setCurrentAlbum = (current_album) => ({
    type: "SET_CURRENT_ALBUM",
    current_album
})

export const setCurrentPlaylist = (current_playlist) => ({
    type: "SET_CURRENT_PLAYLIST",
    current_playlist
})