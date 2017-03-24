import React from 'react';

const GameListEntry = (props) => (
  <li onClick={() => props.sendToGame(props.name)}>{props.name}</li>
)


export default GameListEntry;