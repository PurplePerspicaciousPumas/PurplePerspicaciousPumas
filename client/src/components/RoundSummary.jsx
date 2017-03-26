import React from 'react';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';

const RoundSummary = (props) => (
  <div id="RoundSummary">
    <h4>'Prompt: ' {props.round.prompt} <small> 'Judge: '{props.judge} </small></h4>
    <h5>Responses</h5>
    <ListGroup id="responses-summary">
      {props.round.responses.map((response) => (
        <ListGroupItem id="response-item"> 
         {response[1] === props.round.winner && 'WON: ' }{response[0]} {response[1]} 
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)


export default RoundSummary