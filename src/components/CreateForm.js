import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import gameServer from '../lib/gameServer';
import { withRouter } from 'react-router-dom';

class CreateForm extends Component {

  state = {
    roomName:'',  
}

handleEdit = event => {
  this.setState({
    [event.target.name]: event.target.value,
  })
}

handleSubmit = (event) => {
  event.preventDefault();
  const { roomName } = this.state;
  
  gameServer.createGame(roomName)
  .then( game => {
    this.props.history.push('../pages/game/Create.js');
   
  })
 
}

  render() {
    const { roomName } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="input is-success" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          <input className="button is-success" type="submit" value="Create Game"/>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(CreateForm));