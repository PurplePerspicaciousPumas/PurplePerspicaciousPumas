import React from 'react';

const GameListEntry = (props) => (
  <li onClick={() => props.onClick(props.gameInfo)}>{props.name}</li>
)


export default GameListEntry;