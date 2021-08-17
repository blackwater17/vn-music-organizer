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



export default (songs, {search_term="", songs_page=1, liked_songs_page=false, complete=false, artist_name="", album_name="" } ) =>  {   // default atamalar yaptık, aslında değişcekler
    

    if (complete === true) {

        //console.log('song.artist: ' + song.artist);
        //console.log('artist_name: ' + artist_name);
        //console.log('song.album_name: ' + song.album_name );
        //console.log('album_name: ' + album_name);
        
        let all_results = songs.filter((song) => {

            if (song.artist === artist_name || song.album_name === album_name) return true
            else return false
        })

        return all_results
        
    }     
       
 






    let liked_only = false
    let url = window.location.href
    if (url.includes("/liked")) liked_only = true

    let all_results


    if (!liked_only) { // normal aramalar için

        all_results = songs.filter((song) => {
            const isTextMatch = song.song_title.toLowerCase().includes(search_term.toLowerCase())
            return isTextMatch
        })

        let all_results_length = all_results.length
    
    
        if (search_term === "")  {
            all_results = (all_results) // random olcak sonra değiştir.
        }


        if (all_results.length > 10) {
            return { all_results: all_results.slice((songs_page-1)*11, (songs_page*11)-1 ), all_results_length } 
        }

        else return {all_results, all_results_length }
    
    }





    else { // for the /liked page.
  
        // all_results =  songs.filter((e) => {
        //     return e.song_title.toLowerCase().includes("ask")
        // })

       

        all_results =  songs.filter((e) => {
            return e.liked === true
        }).sort((a, b) => (a.album_name > b.album_name) ? 1 : -1) // yakında dateye göre olcak.. şimdi deneme yapıyoz

        
        

        let all_results_length = all_results.length

        return {all_results, all_results_length}

        /*
        if (all_results.length > 10) {
            return { all_results: all_results.slice((liked_songs_page-1)*11, (liked_songs_page*11)-1 ), all_results_length } 
        }

        else return {all_results, all_results_length }
        */
    
    }




    
    

}
