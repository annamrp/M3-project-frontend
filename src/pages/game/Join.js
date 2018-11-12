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
          <label>And now enter your mission. Remember that it must be something simple, but fun (like make someone sing 'La Macarena' or try to touch his nose with his tongue )</label>
          <input className="input is-success" placeholder="Your Mission" type="text" name="mission"  onChange={this.handleEdit}/>
          <input className="button is-success" type="submit" value="Go!"/>
        </form>
      </div>
    )
  }
}

export default withAuth(Join);