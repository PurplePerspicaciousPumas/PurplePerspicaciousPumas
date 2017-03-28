"use strict";
import React from 'react';
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
var Filter = require('bad-words');
var filter = new Filter();

class RespondToPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      responded: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    var filteredResponse = filter.clean(event.target.value)
    this.setState({response: filteredResponse});
  }

  render() {

    const responseForm = (
      <Form inline>
        <FormGroup controlId="formInlineResponse" bsSize="large">
          <FormControl type="text" placeholder="Your Response..." onChange={this.handleInputChange} value={this.state.response}/>
        </FormGroup>
        {' '}
        <Button onClick={() => {
            this.setState({responded: true});
            this.props.handleResponse(this.state.response);
          }
        }>
          Submit
        </Button>
      </Form>
    )



    return (
      <Col id="submit-response">
          {!this.state.responded && responseForm}
          {this.state.responded && <p><b>Your response has been submitted!</b></p>}
      </Col>
    )
  }
}


export default RespondToPrompt;