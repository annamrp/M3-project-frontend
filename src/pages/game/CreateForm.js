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
  const emails = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const { roomName, mission } = this.state;
  
  
  gameServer.createGame(roomName, mission, emails, message)
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
        <h4 className="header">Create game:</h4>
        <form className="create-game-form" onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label className="label">Introduce a name for your game</label>
            <input className="form-message" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          </div>
          <div className="form-input">
            <label className="label">And now your funny mission</label>
            <input className="form-message" placeholder="Introduce a mission" type="text" name="mission" value={mission} onChange={this.handleEdit}/>
          </div>
          <h4 className="header invite">Invite players:</h4>
          <div className="form-input">
            <label className="label" htmlFor="email-adress">Email addresses</label>
            <input className="form-message form-control" type="text" name="email-adress"  id="email" placeholder="email-1@email.com, email-2@email.com..."/>
          </div>
          <div className="form-input">
            <label className="label" htmlFor="message" >Message</label>
            <textarea className="form-message text-area" rows="5" id="message" placeholder="remember include the name of the game"></textarea>
          </div>
          <input className="btn send-create" type="submit" value="Invite and create"/>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(CreateForm));