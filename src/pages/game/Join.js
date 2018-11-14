import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import Navbar from '../../components/Navbar';
import HowToplay from '../../components/HowToplay';


class Join extends Component {

  state = {
    roomName: '',
    mission: '',
    alert: '',
  }

  handleEdit = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { roomName, mission } = this.state;

    gameServer.joinGame(roomName, mission)
    .then (() => {
      this.props.history.push('/profile', this.state.alert)
    })
    .catch(error => {
      const { data } = error.response;
      console.log(data)
      switch(data.error){
        case 'empty field':
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
 
  render() {

    const { alert } = this.state;

    return (
      <div>
        <HowToplay/>
        <Navbar  />     
        <h3 className="header join">Join a Game</h3>
        { alert ? <p className="warning">{ alert }</p> :  null}
        <form onSubmit={this.handleSubmit}>
          <div className="form-input join">
            <label className="label">Introduce the name of the game</label>
            <input className="input" maxLength="15" placeholder="Room's name" type="text" name="roomName" onChange={this.handleEdit}/>
          </div>
          <div className="join-info">
            <div >
              <p>To enter your mission, remember:</p>
              <ul>
                <li className="join-info-list">It must be something simple, but fun (sing 'La Macarena' or try to touch the nose with the tongue)</li>
                <li className="join-info-list">The mission should not be directed to anyone in particular</li>
              </ul>
            </div>
          </div>
          <div className="form-input join">
            <label className="label">Introduce a mission</label>
            <input className="input" placeholder="Your Mission" type="text" name="mission"  onChange={this.handleEdit}/>
          </div>
          <div className="btn-container">
            <input className="btn join" type="submit" value="Go!"/>
          </div>
        </form>     
      </div>
    )
  }
}

export default withAuth(Join);