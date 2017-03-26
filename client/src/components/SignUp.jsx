import React from 'react';
import $ from 'jquery';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      error: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSignUpAttempt(email, username, password) {
    $.ajax({
      url: 'http://localhost:3000/signup',
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: JSON.stringify({'username': username, 'email': email, 'password': password}),
      success: (data) => {
        this.props.sendToLobby();
      },
      error: (err) => {
        this.setState({error: true});
      }
    });
  }

  render() {

    const errorMessage = <p>That username is already taken. Please try again with a different username.</p>

    return (
      <Col id="sign-up">
        <h4 id="signup-header">Sign Up</h4>
        {this.state.error && errorMessage}
        <FormGroup>
          <Form horizontal>
            <Col>
              <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
            </Col>
          </Form>
        </FormGroup>

        <FormGroup bsSize="small">
          <Form horizontal>
            <Col>
              <FormControl type="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
            </Col>
          </Form>
        </FormGroup>

        <FormGroup bsSize="small">
          <Form horizontal>
            <Col>
              <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
            </Col>
          </Form>
        </FormGroup>

      <FormGroup bsSize="small">
        <Col>
          <Button type="submit" onClick={() => this.handleSignUpAttempt(this.state.email, this.state.username, this.state.password)}>
            Sign Up
          </Button>
          <br />
          <br />
          <br />
        </Col>
      </FormGroup>
    </Col>

    )
  }
}
export default SignUp;