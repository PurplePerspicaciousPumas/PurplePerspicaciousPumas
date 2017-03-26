import React from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';

const Winner = (props) => (
  <ListGroup id="winner">
    <h4>Results</h4>
  	{props.responses.map((response) => (
			<ListGroupItem bsStyle={response[1] === props.winner ? 'success' : 'danger'}> 
				<b>{response[1]}:</b> {response[0]} {response[1] === props.winner && <b>(WINNER)</b> } 
			</ListGroupItem>
		))}
      <br />
    <Button onClick={() => {props.handleReadyToMoveOn()}}>I'm Ready to Move On!</Button>
  </ListGroup>
)


export default Winner