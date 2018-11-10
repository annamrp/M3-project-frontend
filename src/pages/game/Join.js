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
          <input className="input is-success" placeholder="Introduce Room's name" type="text" name="roomName" onChange={this.handleEdit}/>
          <input className="input is-success" placeholder="Introduce your Mission" type="text" name="mission"  onChange={this.handleEdit}/>
          <input className="button is-success" type="submit" value="Go!"/>
        </form>
      </div>
    )
  }
}

export default withAuth(Join);