// test

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ChooseUsername from './components/ChooseUsername.jsx';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}

		this.postUsername = this.postUsername.bind(this);
	}


	componentDidMount() {
	}

	postUsername(username) {
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
			<div>
				<h1>Oranges To Oranges</h1>
				<ChooseUsername onClick={this.postUsername}/>
			</div>
		);
	}
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);


