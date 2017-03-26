import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

const SeeResponses = (props) => (
  <ListGroup id="see-responses">
    <h4>Responses</h4>
  	{props.responses.map((response) => (
  			<ListGroupItem id="response-item"> 
  			 <b>{response[1]}:</b> {response[0]}
  			</ListGroupItem>
  		))}
  </ListGroup>
)


export default SeeResponses

// responsep1 is the person