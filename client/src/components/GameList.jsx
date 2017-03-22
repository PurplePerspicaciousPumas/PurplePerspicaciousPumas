import React from 'react';
import GameListEntry from './GameListEntry.jsx';

const GameList = (props) => (
  <ul id="GameList">
    {props.games.map( (game) => <GameListEntry onClick={props.onClick} name={game.gameName} key={game._id} gameInfo={game} />)}
  </ul>
)


export default GameList;