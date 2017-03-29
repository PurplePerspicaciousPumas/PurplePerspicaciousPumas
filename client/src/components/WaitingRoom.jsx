'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

const WaitingRoom = (props) => (
  props.preGameStatus === true ?

  <div>Game begins in {props.pregame.x}</div>

  :

  <Col id='waiting-room'>
  <PageHeader>{props.game.gameName} <small>Waiting Room</small></PageHeader>
    <h3>Number of Players: {props.game.players.length} / 4</h3>
    <br />
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

export default WaitingRoom;


