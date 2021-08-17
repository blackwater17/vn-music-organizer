import React from 'react';

import { connect } from 'react-redux';
import selectGames from '../selectors/games.js';
import GameResultBox from './GameResultBox'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



class GameResults extends React.Component {

    render() {

        return (

            this.props.games.length > 0 &&
                
            <div className="games-full-container full-container">
                <h1>Game results: </h1>
                <div className="game-results">    
                
                    {this.props.games.map((game) =>  <GameResultBox key={game.game_name} {...game } randomColor={getRandomColor()}  /> )} 

                </div>
            </div>
        
        )
    }

}


// direkt gameleri göndermiyoz, bide filter işleminden geçirip onu gönderiyoz.

const mapStateToProps = (state) => {
    return {
        games: selectGames(state.games, state.filters)
    }
}




export default connect(mapStateToProps)(GameResults);

