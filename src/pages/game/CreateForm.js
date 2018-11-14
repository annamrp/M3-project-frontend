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
        <h4>Create game:</h4>
        <form className="create-game-form" onSubmit={this.handleSubmit}>
          <input className="input is-success" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          <input className="input is-success" placeholder="Introduce a mission" type="text" name="mission" value={mission} onChange={this.handleEdit}/>
          <h4>Invite players:</h4>
          <div className="mail-form">
            <label htmlFor="email-adress">Email addresses</label>
            <input type="text" name="email-adress" className="form-control" id="email" />
          </div>
         <div className="mail-form">
            <label htmlFor="message">Message</label>
            <textarea className="form-message" rows="5" id="message"></textarea>
          </div>
          <input className="btn is-success submit-btn" type="submit" value="Invite and create"/>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(CreateForm));