"use strict";
import React from 'react';
import { Panel, Col } from 'react-bootstrap';

const CurrentJudge = (props) => (
  <Col sm={6} smOffset={3} id="current-judge">
    <Panel>
      <b>Current Judge: </b> {props.judge}
    </Panel>
  </Col>
)


export default CurrentJudge;