"use strict";
import React from 'react';
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
var Filter = require('bad-words');
var filter = new Filter();

class CreatePrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    var filteredPrompt = filter.clean(event.target.value)
    this.setState({prompt: filteredPrompt });
  }

  render() {

    const promptForm = (
      <Form inline>
        <FormGroup controlId="formInlineResponse">
          <FormControl type="text" placeholder="Your prompt..." onChange={this.handleInputChange} value={this.state.prompt}/>
        </FormGroup>
        {' '}
        <Button onClick={() => {
            this.props.handlePromptSubmission(this.state.prompt);
          }
        }>
          Submit
        </Button>
      </Form>
    )



    return (
      <Col id="submit-prompt">
          <h4>Create This Round's Prompt!</h4>
          {promptForm}
      </Col>
    )
  }
}


export default CreatePrompt;