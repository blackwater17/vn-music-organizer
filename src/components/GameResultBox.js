import React from 'react';
import { NavLink } from 'react-router-dom';


const GameResultBox = (props) => (
    
    <div className="game-result-box" style={{backgroundColor:props.randomColor}}>
        <div>
            <NavLink className="game-nav-link" to={"game/" + props.game_name}  > <div>{props.game_name}</div></NavLink>
            
        </div>
        
    </div>
)

export default GameResultBox;



