import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

class ChooseWinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <ListGroup id="choose-winner">
        <h4>Responses</h4>
        {this.props.responses.map((response) => (
          <Col>
            <ListGroupItem onClick={this.props.handleJudgeSelection.bind(null, response[1])}> 
              {response[0]} 
            </ListGroupItem>
            <br />
          </Col>
          ))}
      </ListGroup>
    )
  }
}



export default ChooseWinner