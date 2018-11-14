import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import EmailForm from '../../components/EmailForm';
import DeleteEmail from '../../components/DeleteEmail';
import HowToplay from '../../components/HowToplay';

class CreateForm extends Component {

  state = {
    roomName:'', 
    mission: '',
    emails: [],
    alert: '',
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
  gameServer.createGame(roomName, mission, emailString, message)
  .then( game => {
    const gameId = game._id;
    this.props.history.push(`/game/${gameId}/create`);
  })
  .catch(error => {
    const { data } = error.response;
    console.log(data)
    switch(data.error){
      case 'Empty fields':
      this.setState({
        alert: 'game name or mission can´t be empty'
      });
      break;
      default:
      this.setState({
        alert: ''
      })
   }
  })
}

handleSubmitEmail = (value) => {
  const { emails } = this.state;
  emails.push(`${value}`);
  this.setState({
    emails,
  })
}

handleDeleteEmail = (index) => {
  const { emails } = this.state;
  emails.splice(index, 1);
  this.setState({
    emails,
  })
}

  render() {
    const { roomName, mission, emails, alert } = this.state;
    
    return (
      <div>
        <Navbar  />
        <HowToplay/>
        <h4 className="header invite">Invite players</h4>
        <div>
        <EmailForm onSubmit={this.handleSubmitEmail} />
        <div> {emails ? <ul className="email-list">
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
          </div>
        <form className="create-game-form" onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label className="label" htmlFor="message">Message</label>
            <textarea className="form-message text-area" rows="5" id="message" placeholder="remember include the name of your game"></textarea>
          </div>
          <h4 className="header create">Create game</h4>
          { alert ? <p className="warning">{ alert }</p> :  null}
          <div className="form-input">
            <label className="label">Introduce a name for your game</label>
            <input className="input" maxLength="15" placeholder="game name" type="text" name="roomName" value={roomName} onChange={this.handleEdit}/>
          </div>
          <div className="form-input">
            <label className="label">And now, your funny mission</label>
            <input className="input" placeholder="Introduce a mission" type="text" name="mission" value={mission} onChange={this.handleEdit}/>
          </div>
          <input className="btn send-create" type="submit" value="Invite and create"/>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(CreateForm));