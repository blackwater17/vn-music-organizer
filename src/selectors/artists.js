function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


export default (artists, {search_term, page=1}) =>  {


    if (page.page === undefined) page =1
    else page = page.page


    if (search_term === "" || search_term === undefined) {
        return artists.slice((page-1)*7, (page*7)-1)
    }

    else {

        let all_results = artists.filter((artist) => {
            const isTextMatch = artist.artist_name.toLowerCase().includes(search_term.toLowerCase())
            return isTextMatch
        })


        if (all_results.length > 7) {
            return all_results.slice((page-1)*7, (page*7)-1)
        }

        else return all_results
    }
}