import React from 'react';
import GameList from './GameList.jsx';
import $ from 'jquery';

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: null
    }
    this.getGames = this.getGames.bind(this);
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    $.ajax({
      url: 'http://localhost:3000/games',
      method: 'GET',
      headers: {'content-type': 'application/json'},
      success: (data) => {
        console.log('got games: ', data);
        this.setState({
          games: data
        })
      },
      error: (err) => {
          console.log('error getting games: ', err);
      }
    });
  }

  render() {
    return (
      <div id="lobby">
        <h3>Lobby</h3>
        <h4>Games:</h4>
        {this.state.games && <GameList games={this.state.games} onClick={this.props.route.sendToGame}/>}
      </div>
    )
  }
}
export default Lobby;