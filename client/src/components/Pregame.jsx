'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

class Pregame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 5,
    }
    this.tick = this.tick.bind(this);
  }


  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.props.gameTransition({seconds:0, status: false});
    }
  }

  componentDidMount() {
    this.setState({ secondsRemaining: this.props.pregame.seconds - 1});
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <Col id='waiting-room'>
      <PageHeader>{this.props.game.gameName} <small>Waiting Room</small></PageHeader>
        <h3>Number of Players: 4 / 4</h3>
        <br />
        <div>Game starts in {this.state.secondsRemaining} seconds!</div>

        <Col sm={6} smOffset={3}>
          <Rules/>
        </Col>
      </Col>
    )
  }

}


export default Pregame;




