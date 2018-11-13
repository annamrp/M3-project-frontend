import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

class CreateForm extends Component {

  state = {
    roomName:'', 
    mission: '' 
}

handleEdit = event => {
  this.setState({
    [event.target.name]: event.target.value,
  })
  
}

handleSubmit = (event) => {
  event.preventDefault();
  const { roomName, mission } = this.state;
  
  gameServer.createGame(roomName, mission)
  .then( game => {
    const gameId = game._id;
    this.props.history.push(`/game/${gameId}/create`);
  })
 
}

  render() {
    const { roomName, mission } = this.state;

    return (
      <div>
        <Navbar  />
        <form className="create-game-form" onSubmit={this.handleSubmit}>
          <input className="input is-success" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          <input className="input is-success" placeholder="Introduce a mission" type="text" name="mission" value={mission} onChange={this.handleEdit}/>
          {/* <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label for="message">Message</label>
              <textarea className="form-control" rows="5" id="message"></textarea>
            </div> */}
          <input className="btn is-success submit-btn" type="submit" value="Create"/>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(CreateForm));