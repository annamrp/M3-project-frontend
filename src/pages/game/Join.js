import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';


class Join extends Component {

  state = {
    roomName: '',
    mission: ''
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
      this.props.history.push('/profile')
    })

  }
 
  render() {
    return (
      <div>
        <h2>Join a Game</h2>
          <form onSubmit={this.handleSubmit}>
          <label>Introduce the name of the room:</label>
          <input className="input is-success" placeholder="Room's name" type="text" name="roomName" onChange={this.handleEdit}/>
          <div>
          <label>To enter your mission, remember:<br />· It must be something simple, but fun (sing 'La Macarena' or try to touch the nose with his tongue)<br />· The mission should not be directed to anyone in particular</label>
          </div>
          <input className="input is-success" placeholder="Your Mission" type="text" name="mission"  onChange={this.handleEdit}/>
          <input className="btn is-success" type="submit" value="Go!"/>
        </form>
      </div>
    )
  }
}

export default withAuth(Join);