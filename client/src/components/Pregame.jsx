'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

class Pregame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: this.props.pregame.x,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.preGaming(false);
  }

  render () {
    if (this.state.secondsRemaining === 0) {
      console.log('being called at the Pregame component');
      this.handleChange();
    }
    return (
      <Col id='waiting-room'>
      <PageHeader>{props.game.gameName} <small>Waiting Room</small></PageHeader>
        <h3>Number of Players: 4 / 4</h3>
        <br />
        <div>Game starts in {this.state.secondsRemaining} seconds!</div>
        <h4>Current Players:</h4>
        <Col sm={4} smOffset={4}>
          <ListGroup>
            {props.game.players.map( (player) => <ListGroupItem>{player}</ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col sm={6} smOffset={3}>
          <Rules/>
        </Col>
      </Col>
    )
  }

}


export default Pregame;


