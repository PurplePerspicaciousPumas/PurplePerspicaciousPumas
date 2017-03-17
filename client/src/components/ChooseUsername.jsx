import React from 'react';

class ChooseUsername extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null
    }

    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div id="choose-username">
        <form> 
          <input placeholder="Choose a username..." type="text" onBlur={this.updateState} />
          <button type="button" onClick={() => this.props.onClick(this.state.username)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default ChooseUsername;