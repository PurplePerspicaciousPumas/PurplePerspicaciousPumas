import React from 'react';
import { Col, Panel } from 'react-bootstrap';

const GameDescription = (props) => (
  <Col id="GameDescription" sm={6} smOffset={3}>
    <h4>What Is It?</h4>
    <Panel>
      <b>Oranges to Oranges</b> is a four-player game where players try to come up 
      with the funniest responses to thought-provoking questions. Sign up or 
      log in below!
    </Panel>
    <br />
  </Col>
)


export default GameDescription;