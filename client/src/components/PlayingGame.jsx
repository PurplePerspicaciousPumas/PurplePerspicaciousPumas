import React from 'react';
import Prompt from './PlayingGameComponents/Prompt.jsx';
import CurrentJudge from './PlayingGameComponents/CurrentJudge.jsx';
import PlayersResponding from './PlayingGameComponents/PlayersResponding.jsx';
import SeeResponses from './PlayingGameComponents/SeeResponses.jsx';
import Winner from './PlayingGameComponents/Winner.jsx'
import RespondToPrompt from './PlayingGameComponents/RespondToPrompt.jsx';
import ChooseWinner from './PlayingGameComponents/ChooseWinner.jsx';
// this.props.game = game instance object

class PlayingGame extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      role: null // can either be judge or player
    };

    this.getRole = this.getRole.bind(this);
  }

  componentDidMount() {
    this.getRole();
  }

  getRole() {
    var curRound = this.props.game.currentRound;
    
    if (this.props.game.players[curRound] === this.props.user) {
      this.setState({role: 'judge'})
    } else {
      this.setState({role: 'player'})
    }
  }

  render() {
    var curRound = this.props.game.currentRound;
    var curPrompt = this.props.game.rounds[curRound].prompt;
    var curJudge = this.props.game.players[curRound];
    var stage = this.props.game.rounds[curRound].stage;
    var responses = this.props.game.rounds[curRound].responses;
    var winner = this.props.game.rounds[curRound].winner;

    return (
      <div id="playing-game">
        <h2>Playing Game</h2>
        <div>
          <CurrentJudge judge={curJudge} />
          <Prompt prompt={curPrompt}/>
        </div>
        <div>
        {stage === 0 && this.state.role === 'judge' && <PlayersResponding />}
        {stage === 0 && this.state.role === 'player' && <RespondToPrompt onSubmit={this.props.handleResponse}/>}
        {stage === 1 && this.state.role === 'judge' && <ChooseWinner responses={responses} handleJudgeSelection={this.props.handleJudgeSelection}/>}
        {stage === 1 && this.state.role === 'player' && <SeeResponses responses={responses}/>}
        {stage === 2 && <Winner responses={responses} winner={winner} handleReadyToMoveOn={this.props.handleReadyToMoveOn}/>}
        </div>
      </div>
    )
  }
}

export default PlayingGame;