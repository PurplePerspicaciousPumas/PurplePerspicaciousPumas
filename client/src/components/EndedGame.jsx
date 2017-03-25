import React from 'react';
 
 const EndedGame = (props) => (
   <div id='ended-game'>
     <h2>End of game!</h2>
     <h3>Congratulations to all the players:</h3>
     <ol>Players:
       {props.players.map( (player) => <li>{player}</li>)}
     </ol>
 			<ol>
 				{props.game.rounds.map( (round) =>
 					<li>
 						<ul>
 							<li>
 								<strong>{round.prompt}</strong>
 							</li>
 							<li>
						  	{props.responses.map((response) => (
					  			<div> 
					  				{response[0]} {response[1]} 
					  			</div>
					  		))}
 							</li>
 							<li><strong> Winner: {props.winner} </strong> </li>
 						</ul>
 					</li>
 				)}
 			</ol>
   </div>
 )
 
 export default EndedGame;