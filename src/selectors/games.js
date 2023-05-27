
export default (games, {search_term}) =>  {
    return games.filter((game) => {
        const isTextMatch = game.game_name.toLowerCase().includes(search_term.toLowerCase())
        return isTextMatch
    })
}