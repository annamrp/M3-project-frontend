import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import EmailForm from '../../components/EmailForm';
import DeleteEmail from '../../components/DeleteEmail';

class CreateForm extends Component {

  state = {
    roomName:'', 
    mission: '',
    emails: [],
}

handleEdit = event => {
  this.setState({
    [event.target.name]: event.target.value,
  })
  
}

handleSubmit = (event) => {
  event.preventDefault();
  const message = document.getElementById('message').value;
  const { roomName, mission, emails } = this.state;
  let emailString;
  if (typeof emails === Array) {
     emailString = emails.join(', ');
  } else {
    emailString = emails;
  }
  console.log(emailString);
  gameServer.createGame(roomName, mission, emailString, message)
  .then( game => {
    const gameId = game._id;
    this.props.history.push(`/game/${gameId}/create`);
  })
 
}

handleSubmitEmail = (value) => {
  const { emails } = this.state;
  emails.push(`${value}`);
  this.setState({
    emails,
  })
  console.log(emails);
}

handleDeleteEmail = (index) => {
  const { emails } = this.state;
  emails.splice(index, 1);
  this.setState({
    emails,
  })
}

  render() {
    const { roomName, mission, emails } = this.state;
    
    return (
      <div>
        <Navbar  />
        <h4>Create game:</h4>
        <h4>Invite players:</h4>
        <EmailForm onSubmit={this.handleSubmitEmail} />
        <div> {emails ? <ul>
                  { emails.map((email, index) => {
                    return <DeleteEmail 
                      emails={email} 
                      key={index}
                      index={index}
                      onDelete={this.handleDeleteEmail} 
                    />
                  })}
                </ul>
                : null 
                }
          </div>
        <form className="create-game-form" onSubmit={this.handleSubmit}>
          <input className="input is-success" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          <input className="input is-success" placeholder="Introduce a mission" type="text" name="mission" value={mission} onChange={this.handleEdit}/>
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