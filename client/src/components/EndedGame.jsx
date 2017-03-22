import React from 'react';

const EndedGame = (props) => (
  <div id='ended-game'>
    <h2>End of game!</h2>
    <h3>Congratulations to all the players:</h3>
    <ol>Players:
      {props.players.map( (player) => <li>{player}</li>)}
    </ol>
  </div>
)

export default EndedGame;
