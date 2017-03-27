"use strict";
import React from 'react';
import { Col, Panel } from 'react-bootstrap';

const Prompt = (props) => (
  <Col id="prompt">
    <Panel>
      <b>Prompt: </b>{props.prompt}
    </Panel>
    <br />
  </Col>
)


export default Prompt;