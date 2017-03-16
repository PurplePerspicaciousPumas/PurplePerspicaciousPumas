// test

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		this.promptUsername;
	}

	promptUsername() {
		var username = prompt('What is your username?');

		$.ajax({
			url: 'http://localhost:3000/users',
			method: 'POST',
			headers: {'content-type': 'application/json'},
			data: JSON.stringify('username': username),
			success: (data) => {
				console.log('added user to users DB');
			},
			error: (err) => {
				console.log('error in username POST: ', err);
			}
		});
	}

	render() {
		return (
			<h1>Oranges To Oranges</h1>
		);
	}
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);


