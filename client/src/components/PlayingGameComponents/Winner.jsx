import React from 'react';

const Winner = (props) => (
  <div id="winner">
  	{props.responses.map((response) => (
  			<div> 
  				{response[1] === props.winner && 'WON: ' }{response[0]} {response[1]}  
  			</div>
  		))}
    <button onClick={() => {props.handleReadyToMoveOn()}}>I'm Ready to Move On!</button>
  </div>
)


export default Winner